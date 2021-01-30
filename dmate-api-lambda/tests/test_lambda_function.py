import lambda_function


def test_fetch_suggestions():
    # Arange
    USER_NAME = "User"
    MATCH_NAME = "Nadz"
    MATCH_INTERESTS = []
    MESSAGES = [
        [USER_NAME, "hi"],
        [MATCH_NAME, "hi"],
        [USER_NAME, "You're cute!"],
    ]


    # Act
    attributes = lambda_function.PromptAttributes(
        user_name="Jonathan", match_name=MATCH_NAME, interests=MATCH_INTERESTS
    )
    suggestions = lambda_function.fetch_suggestions(
        attributes=attributes, messages=MESSAGES
    )
    print(suggestions)

    # Assert
    # assert "description" in prompt

    # Cleanup