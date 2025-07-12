from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

DISASTER_TYPES = [
    ('Fire', 'Fire'),
    ('Flood', 'Flood'),
    ('Earthquake', 'Earthquake'),
    ('Other', 'Other'),
]

class Disaster(models.Model):
    type = models.CharField(max_length=20, choices=DISASTER_TYPES)
    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(upload_to='disaster_images/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} at ({self.latitude}, {self.longitude})"


class Shelter(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    capacity = models.IntegerField(default=50)  # optional
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class Volunteer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    skills = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    registered_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user.username