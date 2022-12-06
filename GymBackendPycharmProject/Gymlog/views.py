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
    def get_queryset(self):
        name = self.request.query_params['name'] if 'name' in self.request.query_params else ''
        description = self.request.query_params['description'] if 'description' in self.request.query_params else ''
        difficulty = self.request.query_params['difficulty'] if 'difficulty' in self.request.query_params else -1
        return Workout.objects.filter(name__icontains=name,
                description__icontains=description,
                difficulty__gte=difficulty).order_by('name')

    serializer_class = WorkoutSerializer


