"""GymBackendPycharmProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from Gymlog.views import UserViewSet, ExerciseViewSet, WorkoutViewSet
from django.urls import include, path
from rest_framework import routers
import Gymlog.views as views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'workouts', WorkoutViewSet, basename="Workouts")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/authorize/', views.AuthView.as_view(),name="auth"),
    path('api/admin/', admin.site.urls),
    path('api/account/create/',views.create_user,name="create_user"),
    path('api/account/createsuper/',views.create_super_user,name="create_usersuper"),
    # path('api/test/',views.ExampleView.as_view(), name="test"),
    path('api/logout/', views.logout,name="logout"),
    path('api/favourites/', views.favourites,name="favourites"),
    path('api/add-favourites/', views.add_favourite,name="add-favourites"),
    path('api/isAuth/', views.checkauth,name="isAuth"),
    path('api/createworkout/', views.add_workout,name="createWorkout"),
    path('api/managerworkouts/', views.tobePublictedWorkouts, name="tobePublictedWorkouts"),
    path('api/creator_workouts/', views.workouts_forCreator, name="workoutsforCreator"),
    path('api/change_workout_state/', views.change_workout_state, name="changeWorkoutState"),
    path('api/decline_workout/', views.decline_workout, name="declineWorkout"),
    path('api/edit_workout/', views.edit_workout, name="edit_workout"),
    path('api/get_workout/', views.get_workout, name="get_workout"),
    path('api/delete_workout/', views.delete_workout, name="delete_workout"),
    path('api/managerworkouts_filtered/', views.tobePublictedWorkouts_filtered, name="tobePublictedWorkouts_filtered")


]
