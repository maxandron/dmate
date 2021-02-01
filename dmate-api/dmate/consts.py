"""
All constants will go here.
Don't confuse with config which will house
more dynamic constants that can be changed via environment variables
"""

PROMPT_FORMAT = (
    "The following is a Tinder conversation "
    "between a {user_gender} called {user_name}, "
    "and a {match_gender} called {match_name}. "
    "{user_name} is {characteristics}. "
    "{interests}"
    "{goal}"
    "\n###\n{messages}\n{user_name}:"
)
GOAL_FORMAT = "The goal of {user_name} is {user_goal}"

INTERESTS_FORMAT = "{match_name}'s interests include {interests}. "
SINGLE_INTEREST_FORMAT = "{match_name} is interested in {interests}. "


USER_NAME = "Jonathan"
USER_GENDER = "man"
MATCH_NAME = "{match_name}"
MATCH_GENDER = "woman"
USER_CHARACTISTICS = "single, flirty, funny, clever, and kind"
USER_GOAL = "to get a date with {match_name} without being too pushy."
SET_GOAL = True
TAIL_EXCHANGES = 4

# Client side params
CLIENT_SIDE_USER_NAME = "User"
