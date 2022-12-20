

from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth import models as user_models
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(self, username,  password,  is_superuser, **extra_fields):
        now = timezone.now()
        user = self.model(
            username=username,
            is_superuser=is_superuser,
            last_login=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extra_fields):

        return self._create_user(username, password, False,  **extra_fields)



    def create_superuser(self, username, password, **extra_fields):

        user = self._create_user(username, password, True, **extra_fields)
        user.save(using=self._db)
        return user


# Create your models here.
class User(user_models.AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()
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


