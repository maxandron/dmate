import json
import os
import openai
from typing import List, Dict


PROMPT_FORMAT = (
    "The following is a Tinder conversation "
    "between a {user_name} and {match_name}. "
    "The {user_name} is {attributes}. "
    "{description}{interests}"
    "The goal of the {user_name} is {goal} with the {match_name} "
    "without being too pushy."
    "\n###\n{messages}\n{user_name}:"
)

DESCRIPTION_FORMAT = (
    "The {match_name}'s profile description is: '{description}'. "
)
INTERESTS_FORMAT = "{match_name}'s interests include {interests}."
SINGLE_INTEREST_FORMAT = "{match_name} is interested in {interests}."

OPTIONS_AMOUNT = 3
SERVER_USER_NAME = "Clever Man"
SERVER_MATCH_NAME = "Woman"
CLIENT_USER_NAME = "User"
USER_ATTRIBUTES = "flirty, easygoing, clever, mysterious, and kind"
USER_GOAL = "to get a date"

# dynamo = boto3.client('dynamodb')


def list_of_items_to_grammatical_text(items: List[str]) -> str:
    if len(items) <= 1:
        return "".join(items)
    if len(items) == 2:
        return " and ".join(items)
    return "{}, and {}".format(", ".join(items[:-1]), items[-1])


def create_prompt(
    user_name: str,
    match_name: str,
    attributes: str,
    goal: str,
    description: str,
    interests: List[str],
    messages: List[str],
) -> str:
    formatted_description = ""
    formatted_interests = ""

    if description:
        formatted_description = DESCRIPTION_FORMAT.format(
            match_name=match_name, description=description.replace('\n', ' ')
        )
    if interests:
        if len(interests) == 1:
            interests_format = SINGLE_INTEREST_FORMAT
        else:
            interests_format = INTERESTS_FORMAT
        formatted_interests = interests_format.format(
            match_name=match_name,
            interests=list_of_items_to_grammatical_text(interests),
        )

    return PROMPT_FORMAT.format(
        user_name=user_name,
        match_name=match_name,
        attributes=attributes,
        goal=goal,
        description=formatted_description,
        interests=formatted_interests,
        messages="\n".join(messages),
    )


def respond(err, res=None) -> Dict:
    return {
        "statusCode": "400" if err else "200",
        "body": err.message if err else json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def openai_content_filter(prompt: str) -> Dict:
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


def openai_gpt3(prompt: str, stops: List[str]) -> Dict:
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
        stop=stops,
    )
    return response["choices"]


def average_logprob(logprobs: List[float]) -> float:
    return sum(logprobs) / len(logprobs)


def sanitize_response(choices: Dict) -> List[str]:
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


def fetch_suggestions(
    user_name: str,
    match_name: str,
    attributes: str,
    goal: str,
    description: str,
    interests: List[str],
    messages: List[Dict[str, str]],
) -> List[str]:
    """Calls openai to receive reply suggestions and santizes the response
    Returns a list of the choices
    """
    prompt = create_prompt(
        user_name,
        match_name,
        attributes,
        goal,
        description,
        interests,
        format_messages(user_name, match_name, messages),
    )
    print(prompt)
    choices = openai_gpt3(prompt, [user_name, match_name])
    return sanitize_response(choices)


def client_to_server_sender(
    sender: str, user_name: str, match_name: str
) -> str:
    if sender == CLIENT_USER_NAME:
        return user_name
    return match_name


def format_messages(
    user_name: str, match_name: str, messages_array: List[Dict[str, str]]
) -> List[str]:
    """Formats the json array received from the client
    into what openai expects
    """
    messages = []
    for messages_dict in messages_array:
        sender, message = messages_dict.popitem()
        messages.append(
            "{}: {}".format(
                client_to_server_sender(sender, user_name, match_name), message
            )
        )
    return messages


def lambda_handler(event: Dict, context):
    openai.api_key = os.environ["OPENAI_API_KEY"]

    payload = json.loads(event["body"])

    suggestions = fetch_suggestions(
        SERVER_USER_NAME,
        payload["match_name"],
        USER_ATTRIBUTES,
        USER_GOAL,
        payload["match_description"],
        payload["match_interests"],
        payload["messages"],
    )

    return respond(None, suggestions)
