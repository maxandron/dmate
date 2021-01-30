import requests
import json
from ua_parser import user_agent_parser

CAPTCHA_URI = "https://www.google.com/recaptcha/api/siteverify"
RECAPTCHA_SECRET = "6LdzJTkaAAAAANxLXC81NbBIXfyvsGR_mZCuBhvu"


class UserAgentVerificationError(Exception):
    pass


class NoBodyError(Exception):
    pass


class BodyNotJsonError(Exception):
    pass


class NoMessagesError(Exception):
    pass


class NoMatchNameError(Exception):
    pass


class MaliciousMatchNameError(Exception):
    pass


class MaliciousMessagesError(Exception):
    pass


class MaliciousInterestError(Exception):
    pass


class RecaptchaVerificationError(Exception):
    pass


def sanitize_prompt_injections(input):
    return input.replace("\n", ". ")


def check_mandatory_inputs(payload):
    # Check mandatory data in request
    if "messages" not in payload:
        raise NoMessagesError(
            "No messages in client request! request: {}".format(payload)
        )
    if "match_name" not in payload:
        raise NoMatchNameError(
            "No match_name in client request! request: {}".format(payload)
        )


def search_for_malicious_input(payload):
    for interest in payload["interests"]:
        if "\n" in interest:
            raise MaliciousInterestError(
                "Found malicious input in interest: {}".format(interest)
            )
    if "\n" in payload["match_name"]:
        raise MaliciousMatchNameError(
            "Found malicious input in match_name: {}".format(
                payload["match_name"]
            )
        )


def secure_the_messages(messages):

    if not isinstance(messages, list):
        raise MaliciousMessagesError(
            "Found malicious messages: {}".format(messages)
        )

    secured_messages = []
    for message in messages:
        secured_message = [
            sanitize_prompt_injections(message[0]),
            sanitize_prompt_injections(message[1]),
        ]
        secured_messages.append(secured_message)
    return secured_messages


def verify_request_data(event):
    if "body" not in event:
        raise NoBodyError("No body in event: {}".format(event))

    try:
        body = json.loads(event["body"])
        if not isinstance(body, dict):
            raise BodyNotJsonError(
                "The body {} is not in a JSON format".format(event["body"])
            )
        return body
    except json.decoder.JSONDecodeError:
        raise BodyNotJsonError(
            "The body {} is not in a JSON format".format(event["body"])
        )


def secure_user_input(payload):
    if "interests" not in payload:
        payload["interests"] = []

    check_mandatory_inputs(payload)
    search_for_malicious_input(payload)
    payload["messages"] = secure_the_messages(payload["messages"])

    return payload


def verify_user_agent(user_agent: str):
    if user_agent_parser.Parse(user_agent)["user_agent"]["family"] != "Chrome":
        raise UserAgentVerificationError(
            "User agent '{}' failed verification".format(user_agent)
        )


def verify_captcha(token: str):
    res = requests.post(
        CAPTCHA_URI,
        {"secret": RECAPTCHA_SECRET, "response": token},
    ).json()
    if not res["success"] or res["score"] < 0.5:
        raise RecaptchaVerificationError(token, res)
