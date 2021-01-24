import json
import os
import openai
from ua_parser import user_agent_parser
import requests
from typing import List, Dict, Tuple


PROMPT_FORMAT = (
    "The following is a Tinder conversation "
    "between a {user_name} and {match_name}. "
    "The {user_name} is {attributes}. "
    "{interests}"
    "{goal}"
    "\n###\n{messages}\n{user_name}:"
)
GOAL_FORMAT = (
    "The goal of the {user_name} is {user_goal} with {match_name} "
    "without being too pushy."
)

INTERESTS_FORMAT = "{match_name}'s interests include {interests}. "
SINGLE_INTEREST_FORMAT = "{match_name} is interested in {interests}. "

OPTIONS_AMOUNT = 3
SERVER_USER_NAME = "Man"
CLIENT_USER_NAME = "User"
USER_ATTRIBUTES = "flirty, funny, clever, mysterious, and kind"
USER_GOAL       = "to get a date"
SET_GOAL        = False
TAIL_EXCHANGES = 4

RECAPTCHA_SECRET = "6LdzJTkaAAAAANxLXC81NbBIXfyvsGR_mZCuBhvu"


class UserAgentVerificationError(Exception):
    pass


class RecaptchaVerificationError(Exception):
    pass


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
    set_goal: bool,
    user_goal: str,
    interests: List[str],
    messages: List[str],
) -> str:

    formatted_interests = ""
    if interests:
        if len(interests) == 1:
            interests_format = SINGLE_INTEREST_FORMAT
        else:
            interests_format = INTERESTS_FORMAT
        formatted_interests = interests_format.format(
            match_name=match_name,
            interests=list_of_items_to_grammatical_text(interests),
        )
    
    formatted_goal = ""
    if SET_GOAL:
        goal_text = GOAL_FORMAT.format(
            user_name=user_name,
            match_name=match_name,
            user_goal=user_goal
        )
        

    return PROMPT_FORMAT.format(
        user_name=user_name,
        match_name=match_name,
        attributes=attributes,
        goal=goal_text,
        interests=formatted_interests,
        messages="\n".join(messages),
    )


def respond(res) -> Dict:
    return {
        "statusCode": "200",
        "body": json.dumps(res),
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
    set_goal: bool,
    user_goal: str,
    interests: List[str],
    messages: List[Tuple[str, str]],
) -> List[str]:
    """Calls openai to receive reply suggestions and santizes the response
    Returns a list of the choices
    """
    prompt = create_prompt(
        user_name,
        match_name,
        attributes,
        set_goal,
        user_goal,
        interests,
        format_messages(user_name, match_name, messages),
    )
    print(prompt)
    choices = openai_gpt3(prompt, [user_name, match_name])
    print([choice["text"] for choice in choices])
    return sanitize_response(choices)


def client_to_server_sender(
    sender: str, user_name: str, match_name: str
) -> str:
    if sender == CLIENT_USER_NAME:
        return user_name
    return match_name


def format_messages(
    user_name: str, match_name: str, messages_array: List[Tuple[str, str]]
) -> List[str]:
    """Formats the json array received from the client into what openai expects.
    Takes only the last few exchanges in the conversation
    """
    messages = []
    is_user = False  # flag to track the current sender
    # start from the end of the conversation
    current_message_index = len(messages_array) - 1
    no_of_exchanges = 0
    while no_of_exchanges < TAIL_EXCHANGES and current_message_index >= 0:
        sender, message = messages_array[current_message_index]

        # Basically track every time a "switch" in the conversation occurs
        if sender == CLIENT_USER_NAME and not is_user:
            no_of_exchanges += 1
            is_user = True
        elif sender != CLIENT_USER_NAME and is_user:
            is_user = False

        messages.append(
            "{}: {}".format(
                client_to_server_sender(sender, user_name, match_name), message
            )
        )
        current_message_index -= 1

    messages.reverse()
    return messages


def verify_user_agent(user_agent: str):
    if user_agent_parser.Parse(user_agent)["user_agent"]["family"] != "Chrome":
        raise UserAgentVerificationError(
            "User agent '{}' failed verification".format(user_agent)
        )


def verify_captcha(token: str):
    res = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        {"secret": RECAPTCHA_SECRET, "response": token},
    ).json()
    print(res)
    if not res['success'] or res['score'] < 0.5:
        raise RecaptchaVerificationError(token, res)


def lambda_handler(event: Dict, context):
    payload = json.loads(event["body"])

    verify_user_agent(event["requestContext"]["http"]["userAgent"])
    verify_captcha(payload["recaptcha_token"])

    openai.api_key = os.environ["OPENAI_API_KEY"]

    suggestions = fetch_suggestions(
        SERVER_USER_NAME,
        payload["match_name"],
        USER_ATTRIBUTES,
        SET_GOAL,
        USER_GOAL,
        payload["match_interests"],
        payload["messages"],
    )
    return respond(suggestions)
