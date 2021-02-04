from typing import List, Tuple
from dmate.consts import ConvState


def detect_conversation_state(
    messages: List[Tuple[str, str]]
) -> List[Tuple[str, str]]:
    """Detects the state of the conversation, Can return 3 states
    'new' - new conversation without any messages
    'ongoing' - ongoing and active conversation
    'dead' - a conversation the 'died', last message was sent by the user,
    and there was no reply for more than 24 hours.
    """

    if len(messages) == 0:
        return ConvState.NEW

    return ConvState.ONGOING

    # TODO: Detect "Dead" conversation, need to se messages time from client side.
