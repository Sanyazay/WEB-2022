from django.shortcuts import render
from rest_framework import viewsets
from Gymlog.serializers import UserSerializer, ExerciseSerializer, WorkoutSerializer
from Gymlog.models import User, Exercise, Workout


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = User.objects.all()
    serializer_class = UserSerializer  # Сериализатор для модели

class ExerciseViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer  # Сериализатор для модели

class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer  # Сериализатор для модели
