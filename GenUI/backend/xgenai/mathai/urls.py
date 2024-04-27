from django.urls import path
from .views import update_math_topic, get_all_chat,delete_math_topic, create_or_update_math_topic, get_chat

urlpatterns = [
    path('topic/math/update/<str:name>/', update_math_topic, name='update_math_topic'),
    path('topic/math/delete/<str:name>/', delete_math_topic, name='delete_math_topic'),
    path("get/chat/<str:question>/",get_chat, name='get_chat_topic'),
    path("get/chats/all/",get_all_chat, name='get_chat_topic'),
    path('topic/math/create/<str:topic_name>/', create_or_update_math_topic, name='create_or_update_math_topic'),
]
