import json
import os
import openai

PROMPT_FORMAT = (
    "The following is a Tinder conversation "
    "between a {user_name} and a {match_name}. "
    "The {user_name} is {attributes}. "
    "{description}"
    "The goal of the {user_name} is {goal} with the {match_name} "
    "without being too pushy."
    "\n###\n{chat}\n{user_name}:"
)

DESCRIPTION_FORMAT = "The {match_name}'s profile description is: {description}. "
INTERESTS_FORMAT = "{match_name}'s interests include {interests}."
SINGLE_INTEREST_FORMAT = "{match_name} is interested in {interests}."

OPTIONS_AMOUNT = 3
SERVER_USER_NAME = "Clever Man"
SERVER_MATCH_NAME = "Woman"
CLIENT_USER_NAME = "User"
USER_ATTRIBUTES = "flirty, easygoing, clever, mysterious, and kind"
USER_GOAL = "to get a date"

# dynamo = boto3.client('dynamodb')


def list_of_items_to_grammatical_text(items):
    if len(items) <= 1:
        return "".join(items)
    if len(items) == 2:
        return " and ".join(items)
    return "{}, and {}".format(", ".join(items[:-1]), items[-1])


def respond(err, res=None):
    return {
        "statusCode": "400" if err else "200",
        "body": err.message if err else json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def openai_content_filter(prompt):
    response = openai.Completion.create(
        engine="content-filter-alpha-c4",
        prompt="<|endoftext|>[{}]\n--\nLabel:".format(prompt),
        temperature=0.0,
        max_tokens=1,
        top_p=0,
        logprobs=3,
    )
    print(response)
    return response["choices"][0]


def openai_gpt3(messages):
    prompt = PROMPT_FORMAT.format(
        chat="\n".join(messages),
        user_name=SERVER_USER_NAME,
        match_name=SERVER_MATCH_NAME,
        attributes=USER_ATTRIBUTES,
        goal=USER_GOAL,
    )
    print(prompt)
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        n=OPTIONS_AMOUNT,
        logprobs=1,
        stop=[SERVER_USER_NAME, SERVER_MATCH_NAME],
    )
    return response["choices"]


def average_logprob(logprobs):
    return sum(logprobs) / len(logprobs)


def sanitize_response(choices):
    """Sorts the choices according to the average logprob values of the tokens
    inside the text. Then makes sure to take only the first line
    and strip the spaces
    """
    sorted_options = sorted(
        choices, key=lambda x: average_logprob(x["logprobs"]["token_logprobs"])
    )
    return [
        option["text"].strip().split("\n")[0].strip()
        for option in sorted_options
    ]


def fetch_suggestions(messages):
    """Calls openai to receive reply suggestions and santizes the response
    Returns a list of the choices
    """
    choices = openai_gpt3(messages)
    return sanitize_response(choices)


def client_to_server_sender(sender):
    if sender == CLIENT_USER_NAME:
        return SERVER_USER_NAME
    return SERVER_MATCH_NAME


def format_messages(messages_array):
    """Formats the json array received from the client
    into what openai expects
    """
    messages = []
    for messages_dict in messages_array:
        sender, message = messages_dict.popitem()
        messages.append(
            "{}: {}".format(client_to_server_sender(sender), message)
        )
    return messages


def lambda_handler(event, context):
    openai.api_key = os.environ["OPENAI_API_KEY"]

    payload = json.loads(event["body"])
    messages = format_messages(payload["input"])

    suggestions = fetch_suggestions(messages)

    return respond(None, suggestions)
