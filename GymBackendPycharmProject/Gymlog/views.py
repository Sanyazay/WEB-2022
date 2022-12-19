import json
import uuid

from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Gymlog.serializers import UserSerializer, ExerciseSerializer, WorkoutSerializer
from Gymlog.models import User, Exercise, Workout
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin


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
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        name = self.request.query_params['name'] if 'name' in self.request.query_params else ''
        description = self.request.query_params['description'] if 'description' in self.request.query_params else ''
        difficulty = self.request.query_params['difficulty'] if 'difficulty' in self.request.query_params else -1
        return Workout.objects.filter(name__icontains=name,
                description__icontains=description,
                difficulty__gte=difficulty).order_by('name')

    serializer_class = WorkoutSerializer



#@csrf_exempt
@api_view(["POST"])
def create_user(request):
    data = json.loads(request.body)
    print(data)
    username = data["username"]
    password = data["password"]
    u = User.objects.create_user(username=username, password=password)
    if u is not None:
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"login failed\"}")




class AuthView(APIView):



    def post(self,request):

        data = json.loads(request.body)
        print(data)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            #random_key = uuid.uuid4()
            #session_storage.set(random_key, login)
            u = User.objects.get(username = username)
            u.last_login = timezone.now()
            u.save()

            #print(user.is_authenticated)
            print(user.password)
            response = Response("{\"status\": \"ok\"}", content_type="json")
            #response.set_cookie("session_id", random_key)  # пусть ключем для куки будет session_id
            return response
        else:
            return Response("{\"status\": \"error\", \"error\": \"login failed\"}")



@api_view(["GET"])
def logout_view(request):
    logout(request)
    response = Response("{\"status\": \"ok\"}", content_type="json")
    return response







# @api_view(["POST"])
# def auth_view(request):
#
#     data = json.loads(request.body)
#     print(data)
#     username = data["login"]
#     password = data["password"]
#     user = authenticate(request, username=username, password=password)
#     print(user)
#     if user is not None:
#         login(request, user)
#         random_key = uuid.uuid4()
#         #session_storage.set(random_key, login)
#         u = User.objects.get(username = username)
#         u.last_login = timezone.now()
#         u.save()
#
#         #print(user.is_authenticated)
#         print(user.password)
#         response = Response("{\"status\": \"ok\"}", content_type="json")
#         #response.set_cookie("session_id", random_key)  # пусть ключем для куки будет session_id
#         return response
#     else:
#         return Response("{\"status\": \"error\", \"error\": \"login failed\"}")
# def auth_view(request):
#     username = request.POST["username"] # допустим передали username и password
#     password = request.POST["password"]
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return HttpResponse("{\"status\": \"ok\"}")
#     else:
#         return HttpResponse("{\"status\": \"error\", \"error\": \"login failed\"}")

class ExampleView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)