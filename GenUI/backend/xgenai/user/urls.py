from django.urls import path
from . import views

urlpatterns = [
    path('auth/users/', views.user_create, name='user-create'),
    path('auth/users/activation/', views.user_activate, name='user-activate'),
    path('auth/jwt/create/', views.token_create, name='token-create'),
    path('auth/jwt/refresh/', views.token_refresh, name='token-refresh'),
]
