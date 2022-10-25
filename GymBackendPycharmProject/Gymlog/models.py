from django.db import models


# Create your models here.
class User(models.Model):
    login = models.CharField(max_length=30)
    password = models.CharField(max_length=50)

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
