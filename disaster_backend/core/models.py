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
    severity_level = models.CharField(max_length=100, default='Moderate')  # optional
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    specialization = models.CharField(max_length=200, blank=True)
    contact = models.EmailField()  # This corresponds to contact in formData
    phone = models.CharField(max_length=15)
    contact = models.EmailField()
    availability = models.CharField(max_length=50)
    location = models.CharField(max_length=200)
    experience = models.TextField(blank=True)
    certifications = models.JSONField(blank=True, default=list)  # Assuming PostgreSQL or recent Django
    languages = models.JSONField(blank=True, default=list)       # Same here
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

