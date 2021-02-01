"""
This module houses the prompt engineering logic
"""

from dataclasses import dataclass
from typing import Sequence

from dmate.consts import (GOAL_FORMAT, INTERESTS_FORMAT, MATCH_GENDER,
                          MATCH_NAME, PROMPT_FORMAT, SET_GOAL,
                          SINGLE_INTEREST_FORMAT, USER_CHARACTISTICS,
                          USER_GENDER, USER_GOAL, USER_NAME)


@dataclass(frozen=True)
class PromptAttributes:
    user_name: str = USER_NAME
    user_gender: str = USER_GENDER
    match_name: str = MATCH_NAME
    match_gender: str = MATCH_GENDER
    characteristics: str = USER_CHARACTISTICS
    set_goal: bool = SET_GOAL
    user_goal: str = USER_GOAL
    interests: Sequence[str] = ()


def _list_of_items_to_grammatical_text(items: Sequence[str]) -> str:
    if len(items) <= 1:
        return "".join(items)
    if len(items) == 2:
        return " and ".join(items)
    return "{}, and {}".format(", ".join(items[:-1]), items[-1])


def create_prompt(attributes: PromptAttributes, messages: Sequence[str]) -> str:

    formatted_interests = ""
    if attributes.interests:
        if len(attributes.interests) == 1:
            interests_format = SINGLE_INTEREST_FORMAT
        else:
            interests_format = INTERESTS_FORMAT
        formatted_interests = interests_format.format(
            match_name=attributes.match_name,
            interests=_list_of_items_to_grammatical_text(attributes.interests),
        )

    formatted_goal = ""
    if attributes.set_goal:
        user_goal = attributes.user_goal.format(match_name=attributes.match_name)
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
