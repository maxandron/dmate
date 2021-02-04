import random
from dataclasses import dataclass

from dmate.config import OPTIONS_AMOUNT
from dmate.consts import CONVERSATION_OPENERS


@dataclass(frozen=True)
class OpenerResponse:
    response: str
    is_safe: bool

    def average_logprob(self) -> float:
        return sum(self.token_logprobs) / len(self.token_logprobs)


def get_random_openers(match_name: str):
    all_openers = CONVERSATION_OPENERS.values()
    all_openers = [item for sublist in all_openers for item in sublist]
    selected_openers = random.sample(all_openers, OPTIONS_AMOUNT)

    selected_openers = [
        OpenerResponse(
            response=opener.format(match_name=match_name),
            is_safe=1,
        )
        if "{match_name}" in opener
        else OpenerResponse(
            response=opener,
            is_safe=1,
        )
        for opener in selected_openers
    ]

    return selected_openers
