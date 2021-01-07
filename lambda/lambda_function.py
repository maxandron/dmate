import boto3
import json
import os
import openai
import re

CHOICES_REGEX = r" (.+?) ?[1-9][\.\)\-]| ?(.+?)$"

# dynamo = boto3.client('dynamodb')


def respond(err, res=None):
    return {
        "statusCode": "400" if err else "200",
        "body": err.message if err else json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def openai_response(prompt):
    response = openai.Completion.create(
        engine="instruct-davinci-beta",
        prompt=prompt,
        temperature=0.7,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0.7,
        presence_penalty=0.3,
    )
    print(response)
    return response


def extract_choices(response_text):
    response_text = response_text.replace("\n", " ")
    print(response_text)
    matches = re.findall(CHOICES_REGEX, response_text)
    return ["".join(match) for match in matches]


def is_valid_response(choices):
    return len("".join(choices)) >= 15


def fetch_choices(prompt):
    response_text = openai_response(prompt)["choices"][0]["text"]
    return extract_choices(response_text)


def lambda_handler(event, context):
    # print("Body :" + json.dumps(event["body"]))

    messages = []
    for messages_dict in json.loads(event["body"])["input"]:
        sender, message = messages_dict.popitem()
        messages.append("{}: {}".format(sender, message))

    openai.api_key = os.environ["OPENAI_API_KEY"]

    prompt = "The following is a conversation between a user and a match. The user is flirty, easygoing, clever, mysterious, and kind. The goal of the user is to get a date with the match without being too pushy.\n###\n{}\n\nGenerate 5 clever responses the user may give:\n\n1."
    prompt = prompt.format("\n".join(messages))
    # print(prompt)

    choices = fetch_choices(prompt)

    # once in a while gpt-3 returns an empty response
    # in that case we just try one more time
    if not is_valid_response(choices):
        choices = fetch_choices(prompt)

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

    return respond(None, choices)
