import pytest
import openai


@pytest.fixture(autouse=True)
def mock_openai_completions(monkeypatch):
    def mock_create(**kwargs):
        return {"choices": [{"text": "0"}]}

    monkeypatch.setattr(openai.Completion, "create", mock_create)
