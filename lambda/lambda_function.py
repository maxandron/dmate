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

    if json.loads(event["body"])["input"] != "testing":
        return respond(ValueError("wtf"))

    openai.api_key = os.environ["OPENAI_API_KEY"]

    start_sequence = "\nMe:"
    restart_sequence = "\nMatch: "
    prompt = "The following is a conversation between me and a match. The me is flirty, clever, and kind.\nMe: Hi\nMatch: Hi\n"

    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        temperature=0.9,
        max_tokens=100,
        top_p=1,
        presence_penalty=0.6,
        stop=["\n", "Me:", "Match:"],
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
