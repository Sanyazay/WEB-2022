import json
import uuid
import redis
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from GymBackendPycharmProject import settings
from Gymlog.permissions import DefaultUser, ManagerOrReadOnly, ManagerOnly
from Gymlog.serializers import UserSerializer, ExerciseSerializer, WorkoutSerializer
from Gymlog.models import User, Exercise, Workout
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin

session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)


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

        if 'duration' in self.request.query_params:
            if(self.request.query_params['duration'] == ""):
                duration = "23:59:59"
            else:
                duration = self.request.query_params['duration']

        else:
            duration = '23:59:59'

        return Workout.objects.filter(name__icontains=name,
                description__icontains=description,
                publication_state=2,
                duration__lte=duration,
                difficulty__gte=difficulty).order_by('name')

    serializer_class = WorkoutSerializer


@api_view(["POST"]) #all
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


@api_view(["POST"]) #)))))))
def create_super_user(request):
    data = json.loads(request.body)
    print(data)
    username = data["username"]
    password = data["password"]
    secretkey = data["secretkey"]
    u = User.objects.create_superuser(username=username, password=password)
    if u is not None and secretkey == "1":
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"reg failed\"}")


@api_view(["POST"]) #auth only**
@permission_classes([DefaultUser])
def add_favourite(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_id")
    workout_id = data["workout_id"]

    w = Workout.objects.get(pk=workout_id)

    user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_id')).decode())
    if Workout.objects.filter(user_favourites=user.id, pk=workout_id).exists():
        w.user_favourites.remove(user)
        response = Response("{\"status\": \"delFavourite\"}", content_type="json")
    else:
        w.user_favourites.add(user)
        response = Response("{\"status\": \"addFavourite\"}", content_type="json")
    return response



@api_view(["GET"]) #auth only**
@permission_classes([DefaultUser])
def logout(request):
    ssid = request.COOKIES.get("session_id")
    print(ssid)
    session_storage.delete(ssid)
    return Response(status=status.HTTP_200_OK, data="{\"status\": \"successfully logged out\"}")



@api_view(["GET"]) #all**
def checkauth(request):
    ssid = request.COOKIES.get("session_id")
    if ssid is not None and session_storage.get(request.COOKIES.get('session_id')) is not None:
        user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_id')).decode())

        response = UserSerializer(user)
        return Response(response.data)

    else:
        return Response(status=status.HTTP_204_NO_CONTENT, data="{\"status\": \"Notok\"}")


class AuthView(APIView): #all**

    def post(self, request):
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            key = str(uuid.uuid4())
            session_storage.set(key, username)
            u = User.objects.get(username=username)
            u.last_login = timezone.now()
            u.save()
            response = Response("{\"status\": \"ok\"}", content_type="json")
            response.set_cookie("session_id", key)
            return response
        else:
            return Response("{\"status\": \"error\", \"error\": \"login failed\"}")


@api_view(["GET"]) #all**
@permission_classes([DefaultUser])
def favourites(request):

    user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_id')).decode())
    print(Workout.objects.filter(user_favourites = user))
    response = WorkoutSerializer(Workout.objects.filter(user_favourites=user),many=True)
    return Response(response.data)



@api_view(["POST"]) #auth only**
@permission_classes([DefaultUser])
def add_workout(request):
    data = json.loads(request.body)


    workout_name = data["workout_name"]
    workout_description = data["workout_description"]
    workout_difficulty = data["workout_difficulty"]
    workout_exercises = data["workout_exercises"]
    workout_duration = data["workout_duration"]


    user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_id')).decode())

    w = Workout(name=workout_name, description=workout_description, difficulty=workout_difficulty,
                duration=workout_duration)

    w.creator = user
    map(lambda x: w.exercises.add(int(x)), workout_exercises)
    w.save()

    response = Response("{\"status\": \"addWorkout\"}", content_type="json")
    return response



@api_view(["GET"]) #superuser only**
@permission_classes([ManagerOnly])
def tobePublictedWorkouts(request):
    w=Workout.objects.filter(publication_state__lte=1).order_by("-publication_state")
    response = WorkoutSerializer(w, many=True)
    return Response(response.data)


@api_view(["GET"]) #all**
@permission_classes([DefaultUser])
def workouts_forCreator(request):

    user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_id')).decode())

    response = WorkoutSerializer(Workout.objects.filter(creator=user),many=True)
    return Response(response.data)


@api_view(["POST"]) #manager only**
@permission_classes([ManagerOnly])
def change_workout_state(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_id")
    workout_id = data["workout_id"]

    w = Workout.objects.get(pk=workout_id)
    if(w.publication_state == 0):
        w.publication_state = 1
        w.approve_date = timezone.now()
        w.save()
        response = Response("{\"status\": \"Ok\"}", content_type="json")
    elif(w.publication_state == 1):
        w.publication_state = 2
        w.publication_date = timezone.now()
        w.save()
        response = Response("{\"status\": \"Ok\"}", content_type="json")
    else:
        response = Response("{\"status\": \"error\", \"error\": \"state_error\"}")

    return response

@api_view(["POST"]) #manager only**
@permission_classes([ManagerOnly])
def decline_workout(request):
    data = json.loads(request.body)

    workout_id = data["workout_id"]

    w = Workout.objects.get(pk=workout_id)
    if(w.publication_state != -1):
        w.publication_state = -1

        w.save()
        response = Response("{\"status\": \"Ok\"}", content_type="json")
    else:
        response = Response("{\"status\": \"error\", \"error\": \"state_error\"}")

    return response

@api_view(["POST"]) #manager only**
@permission_classes([DefaultUser])
def edit_workout(request):
    data = json.loads(request.body)

    workout_id = data["workout_id"]
    workout_name = data["workout_name"]
    workout_description =data["workout_description"]
    workout_duration =data["workout_duration"]
    workout_difficulty =data["workout_difficulty"]
    w = Workout.objects.get(pk=workout_id)
    if(workout_name != w.name):
        w.name = workout_name
    if(workout_description != w.description):
        w.description = workout_description
    if(workout_duration != w.duration):
        w.duration = w.duration
    if(workout_difficulty != w.difficulty):
        w.difficulty = workout_difficulty
    w.save()
    response = Response("{\"status\": \"Ok\"}", content_type="json")
        # response = Response("{\"status\": \"error\", \"error\": \"state_error\"}")
    return response

@api_view(["POST"]) #manager only**
@permission_classes([DefaultUser])
def get_workout(request):
    data = json.loads(request.body)

    workout_id = data["workout_id"]

    w = Workout.objects.get(pk=workout_id)

    response = WorkoutSerializer(w)
    return Response(response.data)

@api_view(["POST"]) #manager only**
@permission_classes([ManagerOnly])
def delete_workout(request):
    data = json.loads(request.body)

    workout_id = data["workout_id"]

    w = Workout.objects.get(pk=workout_id)
    w.delete()

    response = Response("{\"status\": \"Ok\"}", content_type="json")


    return response

@api_view(["POST"]) #superuser only**
@permission_classes([ManagerOnly])
def tobePublictedWorkouts_filtered(request):
    data = json.loads(request.body)

    filter_name = data["filter_name"]
    date = data["date_to"]
    date1 = data["date_from"]
    date_state = data["state"]

    if(filter_name == "date" and date != "" and date1 != ""):
        w = Workout.objects.filter(publication_date__lte=date,publication_date__gte=date1,
                                   publication_state__lte=1)
    if (filter_name == "date" and date == "" and date1 != ""):
        w = Workout.objects.filter(publication_date__gte=date1,
                                   publication_state__lte=1)
    if (filter_name == "date" and date != "" and date1 == ""):
        w = Workout.objects.filter(publication_date__lte=date,
                                   publication_state__lte=1)

    if(date_state != -2):
        w = Workout.objects.filter(publication_state__lte=date_state,publication_state__gte=date_state)

    response = WorkoutSerializer(w, many=True)
    return Response(response.data)
