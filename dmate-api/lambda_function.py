import json
from typing import Mapping

from dmate import security
from dmate.dmate import fetch_suggestions
from dmate.prompt import PromptAttributes


def respond(res) -> Mapping:
    return {
        "statusCode": "200",
        "body": json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def lambda_handler(event: Mapping, context):
    # Verify and secure user input
    payload = security.verify_request_data(event)
    payload = security.secure_user_input(payload)

    # Main dmate logic starts with this call
    suggestions = fetch_suggestions(
        PromptAttributes(
            match_name=payload["match_name"], interests=payload["interests"]
        ),
        payload["messages"],
    )

    # Arrange the response
    response = [
        {"message": suggestion.response, "is_safe": suggestion.is_safe}
        for suggestion in suggestions
    ]
    return respond(response)
