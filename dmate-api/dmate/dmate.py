"""
This module will house the main flow of dmate.
Given a secure input the fetch_suggestions function will produce responses
"""

from typing import List, Sequence, Tuple

from dmate.consts import (
    CLIENT_SIDE_USER_NAME,
    TAIL_EXCHANGES,
    MAX_MESSAGE_LENGTH,
)
from dmate.gpt3 import GPT3ChatResponse, gpt3
from dmate.prompt import PromptAttributes, create_prompt

MESSAGE_TYPE = Sequence[Tuple[str, str]]


def _sort_responses(
    responses: List[GPT3ChatResponse],
) -> List[GPT3ChatResponse]:
    """Sorts the choices according to the average logprob values of the tokens
    inside the text."""
    return sorted(responses, key=lambda x: x.average_logprob())


def _format_messages(
    attributes: PromptAttributes, messages: List[Tuple[str, str]]
) -> List[str]:
    return [
        "{}: {}".format(
            _client_to_server_sender(
                sender, attributes.user_name, attributes.match_name
            ),
            message,
        )
        for sender, message in messages
        if len(message) <= MAX_MESSAGE_LENGTH
    ]


def _client_to_server_sender(
    sender: str, user_name: str, match_name: str
) -> str:
    """Converts the client side user name representation to the server side one
    E.g. If the client-side sends it as User: convert it to Man: or whatever"""
    if sender == CLIENT_SIDE_USER_NAME:
        return user_name
    return match_name


def _extract_last_messages(messages_array: Sequence) -> List[Tuple[str, str]]:
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


def fetch_suggestions(
    attributes: PromptAttributes, messages: Sequence[MESSAGE_TYPE]
) -> List[GPT3ChatResponse]:
    """Calls openai to receive reply suggestions and santizes the response
    Returns a list of the choices
    """
    last_messages = _extract_last_messages(messages)
    prompt = create_prompt(
        attributes, _format_messages(attributes, last_messages)
    )
    print(prompt)
    stops = [attributes.user_name, attributes.match_name]
    stops = ["\n" + stop for stop in stops] + ["\n"]
    choices = gpt3(prompt, stops)
    print([choice.response for choice in choices])
    return _sort_responses(choices)
