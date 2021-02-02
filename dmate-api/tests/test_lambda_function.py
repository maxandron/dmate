import pytest
import requests

from dmate.security import (
    BodyNotJsonError,
    MaliciousInterestError,
    MaliciousMatchNameError,
    MaliciousMessagesError,
    NoBodyError,
    NoMatchNameError,
    NoMessagesError,
    RecaptchaNotSentError,
    NoUserAgentError,
    secure_the_messages,
)

import lambda_function


def test_event_without_body():
    event = {}
    with pytest.raises(NoBodyError):
        lambda_function.lambda_handler(event, None)


def test_body_not_json():
    event = {"body": "1221212"}
    with pytest.raises(BodyNotJsonError):
        lambda_function.lambda_handler(event, None)


@pytest.fixture
def ignore_captcha_requests_response(monkeypatch):
    class MockResponse:
        def json(self):
            return {"success": True, "score": 0.6}

    def mock_post(*args, **kwargs):
        return MockResponse()

    monkeypatch.setattr(requests, "post", mock_post)


def test_no_messages(ignore_captcha_requests_response):
    event = {
        "body": '{"recaptcha_token": "123"}',
        "requestContext": {
            "http": {
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
            }
        },
    }

    with pytest.raises(NoMessagesError):
        lambda_function.lambda_handler(event, None)


def test_no_match_name(ignore_captcha_requests_response):
    event = {
        "body": '{"messages": [], "recaptcha_token": "123"}',
        "requestContext": {
            "http": {
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
            }
        },
    }

    with pytest.raises(NoMatchNameError):
        lambda_function.lambda_handler(event, None)


def test_malicious_match_name(ignore_captcha_requests_response):
    event = {
        "body": '{"messages": [], "match_name": "asad\\n", "recaptcha_token": "123"}',
        "requestContext": {
            "http": {
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
            }
        },
    }
    with pytest.raises(MaliciousMatchNameError):
        lambda_function.lambda_handler(event, None)


def test_malicious_interest(ignore_captcha_requests_response):
    event = {
        "body": '{"messages": [], "interests": ["as\\n", "as"], "match_name": "asad", "recaptcha_token": "123"}',
        "requestContext": {
            "http": {
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
            }
        },
    }
    with pytest.raises(MaliciousInterestError):
        lambda_function.lambda_handler(event, None)


def test_malicious_messages(ignore_captcha_requests_response):
    event = {
        "body": '{"messages": "asdads", "interests": ["asn", "as"], "match_name": "asad", "recaptcha_token": "123"}',
        "requestContext": {
            "http": {
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
            }
        },
    }
    with pytest.raises(MaliciousMessagesError):
        lambda_function.lambda_handler(event, None)


def test_no_captcha():
    event = {
        "body": "{}",
        "requestContext": {
            "http": {
                "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
            }
        },
    }
    with pytest.raises(RecaptchaNotSentError):
        lambda_function.lambda_handler(event, None)


def test_no_user_agent():
    event = {
        "body": '{"messages": [], "match_name": "asdad", "match_interests": ["kaka"], "recaptcha_token": "123"}'
    }

    with pytest.raises(NoUserAgentError):
        lambda_function.lambda_handler(event, None)


def test_malicious_interests():
    secured_messages = secure_the_messages([["user", "asd\n"]])
    assert secured_messages[0][1] == "asd. "