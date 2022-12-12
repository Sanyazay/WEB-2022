from django.db import models
from django.contrib.auth import models as user_models
from django.contrib.auth.models import PermissionsMixin

# Create your models here.
class User(user_models.AbstractBaseUser, PermissionsMixin):
    login = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=50)
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = []
    class Meta:
        managed = True
        db_table = 'users'


class Exercise(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    muscle_group = models.CharField(max_length=255)
    difficulty = models.SmallIntegerField()
    video_url = models.URLField()

    def __str__(self):
        return str(self.name)

    class Meta:
        managed = True
        db_table = 'exercises'


# Create your models here.
class Workout(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    difficulty = models.SmallIntegerField()
    duration = models.TimeField()
    exercises = models.ManyToManyField(Exercise)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'workouts'
