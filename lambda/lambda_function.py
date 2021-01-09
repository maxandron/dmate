import boto3
import json
import os
import openai

PROMPT = (
    "The following is a conversation between a user and a match. "
    "The user is flirty, easygoing, clever, mysterious, and kind. "
    "The goal of the user is to get a date with the match "
    "without being too pushy."
    "\n###\n{}\nUser:"
)

# dynamo = boto3.client('dynamodb')


def respond(err, res=None):
    return {
        "statusCode": "400" if err else "200",
        "body": err.message if err else json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def openai_content_filter(prompt):
    response = openai.Completion.create(
        engine="content-filter-alpha-c4",
        prompt="<|endoftext|>[{}]\n--\nLabel:".format(prompt),
        temperature=0.0,
        max_tokens=1,
        top_p=0,
        logprobs=3,
    )
    print(response)
    return response["choices"][0]


def openai_gpt3(messages):
    response = openai.Completion.create(
        engine="davinci",
        prompt=PROMPT.format("\n".join(messages)),
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=["Match", "User"],
    )
    print(response)
    return response["choices"][0]


def sanitize_response(response_text):
    return response_text.split("\n")[0][1:]


def fetch_suggestion(messages):
    """Calls openai to receive a reply suggestion and santizes the response
    """
    response = openai_gpt3(messages)
    response_text = response["text"]
    return sanitize_response(response_text)


def format_messages(messages_array):
    """Formats the json array received from the client
    into what openai expects
    """
    messages = []
    for messages_dict in messages_array:
        sender, message = messages_dict.popitem()
        messages.append("{}: {}".format(sender, message))
    return messages


def lambda_handler(event, context):
    openai.api_key = os.environ["OPENAI_API_KEY"]

    messages = format_messages(json.loads(event["body"])["input"])

    suggestion = fetch_suggestion(messages)

    """    operations = {
        'DELETE': lambda dynamo, x: dynamo.delete_item(**x),
        'GET': lambda dynamo, x: dynamo.scan(**x),
        'POST': lambda dynamo, x: dynamo.put_item(**x),
        'PUT': lambda dynamo, x: dynamo.update_item(**x),
    }

    operation = event['httpMethod']
    if operation in operations:
        payload = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])
        return respond(None, operations[operation](dynamo, payload))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))
    """

    return respond(None, suggestion)
