from rest_framework import serializers
from .models import MathTopic

class MathTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = MathTopic
        fields = '__all__'
