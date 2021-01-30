import json
from typing import Sequence, Mapping, Tuple, List
import dataclasses
from gpt3 import gpt3, GPT3ChatResponse

import security


PROMPT_FORMAT = (
    "The following is a Tinder conversation "
    "between a {user_gender} called {user_name}, "
    "and a {match_gender} called {match_name}. "
    "{user_name} is {characteristics}. "
    "{interests}"
    "{goal}"
    "\n###\n{messages}\n{user_name}:"
)
GOAL_FORMAT = "The goal of {user_name} is {user_goal}"

INTERESTS_FORMAT = "{match_name}'s interests include {interests}. "
SINGLE_INTEREST_FORMAT = "{match_name} is interested in {interests}. "


USER_NAME = "Jonathan"
USER_GENDER = "man"
MATCH_NAME = "{match_name}"
MATCH_GENDER = "woman"
USER_CHARACTISTICS = "single, flirty, funny, clever, and kind"
USER_GOAL = "to get a date with {match_name} without being too pushy."
SET_GOAL = True
TAIL_EXCHANGES = 4

# Client side params
CLIENT_SIDE_USER_NAME = "User"


MESSAGE_TYPE = Sequence[Tuple[str, str]]


@dataclasses.dataclass(frozen=True)
class PromptAttributes:
    user_name: str = USER_NAME
    user_gender: str = USER_GENDER
    match_name: str = MATCH_NAME
    match_gender: str = MATCH_GENDER
    characteristics: str = USER_CHARACTISTICS
    set_goal: bool = SET_GOAL
    user_goal: str = USER_GOAL
    interests: Sequence[str] = ()


def list_of_items_to_grammatical_text(items: Sequence[str]) -> str:
    if len(items) <= 1:
        return "".join(items)
    if len(items) == 2:
        return " and ".join(items)
    return "{}, and {}".format(", ".join(items[:-1]), items[-1])


def create_prompt(
    attributes: PromptAttributes, messages: Sequence[str]
) -> str:

    formatted_interests = ""
    if attributes.interests:
        if len(attributes.interests) == 1:
            interests_format = SINGLE_INTEREST_FORMAT
        else:
            interests_format = INTERESTS_FORMAT
        formatted_interests = interests_format.format(
            match_name=attributes.match_name,
            interests=list_of_items_to_grammatical_text(attributes.interests),
        )

    formatted_goal = ""
    if attributes.set_goal:
        user_goal = attributes.user_goal.format(
            match_name=attributes.match_name
        )
        formatted_goal = GOAL_FORMAT.format(
            user_name=attributes.user_name,
            match_name=attributes.match_name,
            user_goal=user_goal,
        )

    return PROMPT_FORMAT.format(
        user_name=attributes.user_name,
        user_gender=attributes.user_gender,
        match_name=attributes.match_name,
        match_gender=attributes.match_gender,
        characteristics=attributes.characteristics,
        interests=formatted_interests,
        goal=formatted_goal,
        messages="\n".join(messages),
    )


def respond(res) -> Mapping:
    return {
        "statusCode": "200",
        "body": json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def sort_responses(
    responses: List[GPT3ChatResponse],
) -> List[GPT3ChatResponse]:
    """Sorts the choices according to the average logprob values of the tokens
    inside the text."""
    return sorted(responses, key=lambda x: x.average_logprob())


def format_messages(
    attributes: PromptAttributes, messages: List[Tuple[str, str]]
) -> List[str]:
    return [
        "{}: {}".format(
            client_to_server_sender(
                sender, attributes.user_name, attributes.match_name
            ),
            message,
        )
        for sender, message in messages
    ]


def fetch_suggestions(
    attributes: PromptAttributes, messages: Sequence[MESSAGE_TYPE]
) -> List[GPT3ChatResponse]:
    """Calls openai to receive reply suggestions and santizes the response
    Returns a list of the choices
    """
    last_messages = extract_last_messages(messages)
    prompt = create_prompt(
        attributes, format_messages(attributes, last_messages)
    )
    print(prompt)
    stops = [attributes.user_name, attributes.match_name]
    stops = ["\n" + stop for stop in stops] + ["\n"]
    choices = gpt3(prompt, stops)
    print([choice.response for choice in choices])
    return sort_responses(choices)


def client_to_server_sender(
    sender: str, user_name: str, match_name: str
) -> str:
    """Converts the client side user name representation to the server side one
    E.g. If the client-side sends it as User: convert it to Man: or whatever"""
    if sender == CLIENT_SIDE_USER_NAME:
        return user_name
    return match_name


def extract_last_messages(messages_array: Sequence) -> List[Tuple[str, str]]:
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
        if sender == CLIENT_SIDE_USER_NAME and not is_user:
            no_of_exchanges += 1
            is_user = True
        elif sender != CLIENT_SIDE_USER_NAME and is_user:
            is_user = False

        messages.append((sender, message))
        current_message_index -= 1

    messages.reverse()
    return messages


def lambda_handler(event: Mapping, context):

    payload = security.verify_request_data(event)
    payload = security.secure_user_input(payload)

    security.verify_user_agent(event["requestContext"]["http"]["userAgent"])
    security.verify_captcha(payload["recaptcha_token"])

    suggestions = fetch_suggestions(
        PromptAttributes(
            match_name=payload["match_name"], interests=payload["interests"]
        ),
        payload["messages"],
    )

    response = [
        [suggestion.response, suggestion.is_safe] for suggestion in suggestions
    ]
    return respond(response)
