import boto3
import json
import os
import openai

print("Loading function")
# dynamo = boto3.client('dynamodb')


def respond(err, res=None):
    return {
        "statusCode": "400" if err else "200",
        "body": err.message if err else json.dumps(res),
        "headers": {
            "Content-Type": "application/json",
        },
    }


def lambda_handler(event, context):
    print("Body :" + json.dumps(event["body"]))

    messages = ''
    for message_dict in json.loads(event['body']['input']):
        sender, message = message_dict.items()[0]


    openai.api_key = os.environ["OPENAI_API_KEY"]

    prompt = 'The following is a conversation between a user and a match. The user is flirty, easygoing, clever, mysterious, and kind. The goal of the user is to get a date with the match without being too pushy.\n###\n{}\n\nGenerate 5 clever responses the user may give:\n\n1.'
    response = openai.Completion.create(
        engine="instruct-davinci-beta",
        prompt=prompt,
        temperature=0.6,
        max_tokens=64,
        top_p=1,
        frequency_penalty=0.59,
        presence_penalty=0.2,
#        stop=["\n", "User:", "Match:"],
    )

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

    return respond(None, response)
