from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from djoser.views import UserViewSet, UserViewSet as BaseUserViewSet
from djoser.conf import settings

from rest_framework.request import Request
from django.http import HttpRequest

@csrf_exempt
@api_view(['OPTIONS'])
@permission_classes([])
def user_create(request):
    # Use HttpRequest instance from rest_framework.request.Request
    http_request = request._request  # Get the underlying HttpRequest
    user_view = UserViewSet.as_view({'post': 'create'})
    return user_view(http_request)

@csrf_exempt
@api_view(['OPTIONS'])
@permission_classes([])
def user_activate(request):
    http_request = request._request  # Get the underlying HttpRequest
    user_view = BaseUserViewSet.as_view({'post': 'confirm_user'})
    return user_view(http_request, uidb64=request.data.get('uid'), token=request.data.get('token'))

@csrf_exempt
@api_view(['OPTIONS'])
@permission_classes([])
def token_create(request):
    http_request = request._request  # Get the underlying HttpRequest
    response = UserViewSet.as_view({'post': 'login'})(http_request)
    if response.status_code == status.HTTP_200_OK:
        return Response(response.data, status=status.HTTP_201_CREATED)
    return response

@csrf_exempt
@api_view(['OPTIONS'])
@permission_classes([])
def token_refresh(request):
    http_request = request._request  # Get the underlying HttpRequest
    response = UserViewSet.as_view({'post': 'refresh_token'})(http_request)
    return Response(response.data, status=status.HTTP_200_OK)
