import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitorcounts')

def lambda_handler(event, context):
    try:
        print(f"Received event: {json.dumps(event)}")
        should_count = event.get('queryStringParameters', {}).get('count', 'false') == 'true'
        print(f"Should count: {should_count}")
        
        # Get the current view count
        response = table.get_item(Key={'id': '0'})
        print(f"DynamoDB get_item response: {response}")
        
        if 'Item' in response:
            views = response['Item']['views']
        else:
            # Initialize views if 'Item' does not exist
            views = 0
        
        print(f"Current view count: {views}")
        
        # Increment the view count if should_count is True
        if should_count:
            views += 1
            table.put_item(Item={'id': '0', 'views': views})
            print(f"View count incremented: {views}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',  # Allow all origins
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': str(views)
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',  # Allow all origins
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': str(e)
        }
