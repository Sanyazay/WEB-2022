# Generated by Django 4.1.4 on 2022-12-25 18:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Gymlog', '0002_workout_approve_date_workout_creation_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='creation_date',
            field=models.DateField(default=datetime.datetime(2022, 12, 25, 18, 35, 15, 571099, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='workout',
            name='publication_date',
            field=models.DateField(null=True),
        ),
    ]
