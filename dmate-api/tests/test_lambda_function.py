import pytest

from dmate.security import (
    BodyNotJsonError,
    MaliciousInterestError,
    MaliciousMatchNameError,
    MaliciousMessagesError,
    NoBodyError,
    NoMatchNameError,
    NoMessagesError,
)
import lambda_function

# def test_fetch_suggestions():
#     # Arange
#     USER_NAME = "User"
#     MATCH_NAME = "Nadz"
#     MATCH_INTERESTS = []
#     MESSAGES = [
#         [USER_NAME, "hi"],
#         [MATCH_NAME, "hi"],
#         [USER_NAME, "You're cute!"],
#     ]


#     # Act
#     attributes = lambda_function.PromptAttributes(
#         user_name="Jonathan", match_name=MATCH_NAME, interests=MATCH_INTERESTS
#     )
#     suggestions = lambda_function.fetch_suggestions(
#         attributes=attributes, messages=MESSAGES
#     )
#     print(suggestions)

#     # Assert
#     # assert "description" in prompt

#     # Cleanup


def test_event_without_body():
    event = {}
    with pytest.raises(NoBodyError):
        lambda_function.lambda_handler(event, None)


def test_body_not_json():
    event = {"body": "1221212"}
    with pytest.raises(BodyNotJsonError):
        lambda_function.lambda_handler(event, None)


def test_no_messages():
    event = {"body": "{}"}
    with pytest.raises(NoMessagesError):
        lambda_function.lambda_handler(event, None)


def test_no_match_name():
    event = {"body": '{"messages": "1"}'}
    with pytest.raises(NoMatchNameError):
        lambda_function.lambda_handler(event, None)


def test_malicious_match_name():
    event = {"body": '{"messages": "1", "match_name": "asdad\\n"}'}
    with pytest.raises(MaliciousMatchNameError):
        lambda_function.lambda_handler(event, None)


def test_malicious_interest():
    event = {"body": '{"messages": "1", "match_name": "asdad\\n"}'}
    with pytest.raises(MaliciousMatchNameError):
        lambda_function.lambda_handler(event, None)


def test_malicious_messages():
    event = {
        "body": '{"messages": "1", "match_name": "asdad", "match_interests": ["kaka"]}'
    }
    with pytest.raises(MaliciousMessagesError):
        lambda_function.lambda_handler(event, None)


# TODO: Continue security test
# def test_malicious_interests():
#     event = {"body": '{"messages": "[["1", "2"]]", "match_name": "asdad", "match_interests": ["kaka\n"]}'}
#     with pytest.raises(MaliciousInterestError):
#         lambda_function.lambda_handler(event, None)

# def test_legit_payload():
#     event = {"body": {"messages":[["Match","Hey. How is it going"],["User","Pretty well actually, you? :)"],["Match","Haha. Increasingly going mad."],["Match","With work"],["Match","😂"],["User","Oh, I know what you mean. Hahaha..."],["User","What do you do?"],["Match","Lawyer"],["Match","Yourself??"],["User","Interesting 🧐"],["User","I doing cyber security education for the military 🤫"],["Match","Hahaha. The real question is who’s military"],["Match","🙊"],["User","The Singaporean military 👊"],["Match","Hahaha"],["Match","I suppose they do need to be educated"],["Match","🤪"],["User","Indeed they do :) "],["User","It's pretty cool to be able to help them improve their skills. And trust me when I say they are improving!"],["Match","I bet."],["Match","So how long are you here for?"],["User","I'm in Singapore for a year already! 😄"],["User","It is going really well..."],["User","What about you?"],["Match","Almost 3 years home I guess. All very unexpected"],["Match","This is crazy, but do you want to catch dinner this evening? Around 2030"],["User","Sorry, I just saw your message, I really appreciate you being spontaneous! &lt;3"],["User","Hopefully, we can do it another day"],["User","Maybe in the upcoming weekend? "],["Match","Next week?"],["User","Haha your weekend is packed?"],["User","Haha your weekend is packed?"],["User","Actually mine as well"],["User","Next wee ksounds awesome"],["Match","Brilliant. I’m on 9649 2235"],["Match","Drop me a whatsapp"]],"match_name":"Ezann","match_interests":["Working out","Dog lover","Grab a drink","Reading","Wine"],"version":"0.0.1","recaptcha_token":"03AGdBq26rmq4NbScxMTt9X_foui4bzAi4TW-UixEgzQuPuw556SNJ5oLD-Gw3AxLrJcTV6iHOTrt9ALsDeQDM9yI2bZaNb9LZsW_aT3JPkzLghlTrZBuoiqZATt3GBiPm9DzrEVD70OIPZXhFkc4_QfBGcreW2earOYX8Ij2H3DRsc3pE1SZYOB-KKTOZ14ePt0K5qU1taZ6af845FZvdZpXQlpNOxlRHfrxUfzWzVNKdVJaLN8h2G6YEmpG-Nm3eholUNciK8u5vrWXl5Z_65ubuup5uKu6vZk4reRdOVQ-5bf2wRrE09j8_gKkmUM-fhkVGCK37f7URkoav4Mj7OpLvvr4FLBcvDmQ-sPpTMGCI4Oca3MtN_ypZdWh58Qica96iAT-BBsrILbt86axQs6RaYkCvbPBZeSLHx35p3gMlfBavdJvAvK9yldH5P1riEvB0rgo3rpOL"}
