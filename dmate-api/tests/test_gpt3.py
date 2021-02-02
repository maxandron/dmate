import openai

from dmate.gpt3 import gpt3


def test_gpt3_remove_bad_words(monkeypatch):
    # Arrange
    def mock_create(**kwargs):
        if "content-filter" in kwargs["engine"]:
            return {"choices": [{"text": "0"}]}
        return {
            "choices": [
                {"text": "cunt dick pussy", "logprobs": {"token_logprobs": [1]}}
            ]
        }

    monkeypatch.setattr(openai.Completion, "create", mock_create)

    # Act
    responses = gpt3("", [""])

    # Assert
    assert len(responses) == 1
    assert responses[0].response == "**** **** *****"
