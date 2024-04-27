from django.db import models
from django.contrib.auth import get_user_model
import json# Assuming default user model

class MathTopic(models.Model):
    topic_choices = [
        ('Arithmetic', 'Arithmetic'),
        ('Algebra', 'Algebra'),
        ('Calculus', 'Calculus'),
        ('Differential Calculus', 'Differential Calculus'),
        ('Geometry', 'Geometry'),
        ('Additional', 'Additional'),
        ('Word Problems', 'Word Problems'),
    ]
    topic = models.CharField(max_length=100)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    conversation_history = models.TextField(default='[]')  # Store conversation history as JSON string
    ai_generated_content = models.TextField(blank=True)  # Store AI-generated content

    def add_to_conversation_history(self, entry):
        """
        Add an entry to the conversation history.
        """
        conversation_history = self.get_conversation_history()
        conversation_history.append(entry)
        self.conversation_history = json.dumps(conversation_history)
        self.save()

    def get_conversation_history(self):
        """
        Retrieve and parse conversation history JSON.
        """
        print(self.conversation_history)
        return json.loads(self.conversation_history)

    def __str__(self):
        return self.topic
