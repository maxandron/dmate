"""
This module houses only the core interactions with gpt3
"""

from dataclasses import dataclass
from typing import List, Mapping, Sequence, cast

import openai

from dmate import config
from dmate.consts import BAD_WORDS

openai.api_key = config.OPENAI_API_KEY


@dataclass(frozen=True)
class GPT3ChatResponse:
    response: str
    token_logprobs: Sequence[float]
    is_safe: bool

    def average_logprob(self) -> float:
        return sum(self.token_logprobs) / len(self.token_logprobs)


def _content_filter(prompt: str) -> str:
    response = openai.Completion.create(
        engine="content-filter-alpha-c4",
        prompt="<|endoftext|>[{}]\n--\nLabel:".format(prompt),
        temperature=0.0,
        max_tokens=1,
        top_p=0,
        logprobs=3,
    )
    response = cast(Mapping, response)
    return response["choices"][0]["text"]


def _remove_bad_words(response: str) -> str:
    input_set = set(response.split())
    for bad_word in input_set.intersection(BAD_WORDS):
        response = response.replace(bad_word, "*" * len(bad_word))
    return response


def gpt3(prompt: str, stops: Sequence[str]) -> List[GPT3ChatResponse]:
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        n=config.OPTIONS_AMOUNT,
        logprobs=1,
        stop=stops,
    )
    response = cast(Mapping, response)

    # For each response remove bad words and check if its safe with the filter
    return [
        GPT3ChatResponse(
            response=_remove_bad_words(choice["text"]),
            token_logprobs=choice["logprobs"]["token_logprobs"],
            is_safe=int(_content_filter(choice["text"])) == 0,
        )
        for choice in response["choices"]
    ]
