import json

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import api_view

from Gymlog.serializers import UserSerializer, ExerciseSerializer, WorkoutSerializer
from Gymlog.models import User, Exercise, Workout
from django.contrib.auth import authenticate, login
from django.http import HttpResponse




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


def auth_view(request):
    username = request.POST["username"] # допустим передали username и password
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse("{'status': 'ok'}")
    else:
        return HttpResponse("{'status': 'error', 'error': 'login failed'}")

#@csrf_exempt
@api_view(["POST"])
def create_user(request):
    data = json.loads(request.body)
    print(data)
    login = data["login"]
    password = data["password"]
    u = User.objects.create(login=login, password=password)
    if u is not None:

        return HttpResponse("{'status': 'ok'}")
    else:
        return HttpResponse("{'status': 'error', 'error': 'login failed'}")