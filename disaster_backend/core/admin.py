from django.contrib import admin
from .models import Disaster, Shelter, Volunteer

admin.site.register(Disaster)
admin.site.register(Shelter)
admin.site.register(Volunteer)
