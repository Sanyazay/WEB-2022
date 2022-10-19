from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from datetime import date
from bmstu_lab.models import Workout
from bmstu_lab.models import Exercise
import json


def hello(request):
    return render(request, 'index.html')

def GetWorkouts(request):


    return render(request, 'workouts.html', {"data" : {
        "workouts" : Workout.objects.all()
    }})

def GetWorkout(request, id):



    return render(request, 'workout.html', {'data' : {
        "exercise" : Exercise.objects.all(),
        "workout" : Workout.objects.filter(id = id)
    }})