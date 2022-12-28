from Gymlog.models import User, Exercise, Workout
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = ["pk", "username", "password"]


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Exercise
        # Поля, которые мы сериализуем
        fields = ["pk", "name", "description", "muscle_group", "difficulty", "video_url"]


class WorkoutSerializer(serializers.ModelSerializer):
    #exercises = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    exercises = ExerciseSerializer(many=True)
    class Meta:
        # Модель, которую мы сериализуем
        model = Workout
        # Поля, которые мы сериализуем
        fields = ["pk", "name", "description", "difficulty", "duration", "exercises", "user_favourites","creator","publication_state","publication_date","approve_date","creation_date"]

