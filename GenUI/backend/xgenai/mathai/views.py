from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt

from .models import MathTopic
from rest_framework import status
from rest_framework.response import Response
from .serializers import MathTopicSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import requests, datetime, json

url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB0T3xOOh6ecOyKpzLCnURJWsIqI0STNQk'
method = 'POST'  # Replace with appropriate method
headers = {'Content-Type': 'application/json'}  # Optional headers

# Optional data for POST or PUT requests


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_math_topic(request, name):
    math_topic = get_object_or_404(MathTopic, name=name)
    if math_topic.user != request.user:
        return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
    serializer = MathTopicSerializer(math_topic, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_math_topic(request, name):
    math_topic = get_object_or_404(MathTopic, name=name)
    if math_topic.user != request.user:
        return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
    math_topic.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_or_update_math_topic(request, topic_name):
    instruction = "Explain step by step of how th questin might be solve, do't be in a rus explain evrythin g destis" 

    try:
        # MathTopic.objects.all().delete()
        math_topic = MathTopic.objects.get(topic=topic_name)
    except MathTopic.DoesNotExist:
        math_topic = MathTopic.objects.create(topic=topic_name, user=request.user)

    # Extract the user's question from the request body
    question = request.data.get('question', '')

    # Step 2: Qualify the question into response
    response = qualify_question(instruction +  question)

    # Step 3: Update the story with the question and the response
    math_topic = update_story(math_topic, question, response)

    # Serialize the MathTopic instance
    # math_topic_serializer = MathTopicSerializer(math_topic)

    return JsonResponse({**math_topic})

def qualify_question(question):
    """
    Send the question to the endpoint and receive the response.
    """
    # Make a request to the endpoint with the user's question
    response = requests.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB0T3xOOh6ecOyKpzLCnURJWsIqI0STNQk', json={
    "contents": [
        {
            "parts": [
                {
                    "text": question
                }
            ]
        }
    ]
})
    # Extract and return the response from the endpoint
    res = response.json()
    print(res)
    return res['candidates'][0]['content']['parts'][0]['text']

def update_story(math_topic, question, response):
    """
    Update the story with the question and the response.
    """
    # Construct the history entry with the question and the response
    history_entry = {
        "question": question,
        "response": response,
        "timestamp": datetime.datetime.now().timestamp()
    }
    print(history_entry)
    # Append the history entry to the conversation history
    math_topic.add_to_conversation_history(history_entry)
    return {
        "question": question,
        "response": response}





from django.core.serializers import serialize

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_chat(request):
    try:
        math_topics = MathTopic.objects.all()
        
        conversation_data = []
        for topic in math_topics:
            # Parse the conversation history JSON string
            history_json = json.loads(topic.conversation_history)
            
            # Extract questions and responses from parsed conversation history
            for entry in history_json:
                question = entry.get('question', '')
                response = entry.get('response', '')
                
                # Append question and response to conversation_data list
                conversation_data.append({'question': question, 'response': response})
        
        return Response({'conversation_data': conversation_data})
    
    except Exception as e:
        error_message = str(e)
        return Response({'error': error_message}, status=500)   
    
@csrf_exempt  # Not recommended for production; use only for development/testing
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat(request, question):
    try:
        math_topic = MathTopic.objects.get(topic = question)
        math_topic_serializer = MathTopicSerializer(math_topic)
        conversation_history = json.loads(math_topic_serializer.data['conversation_history'])
        return JsonResponse({'conversation_history': conversation_history})
    except MathTopic.DoesNotExist:
        return JsonResponse({'conversation_history': "No Data"}, status=404)   
