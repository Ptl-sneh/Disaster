from django.contrib import admin
from .models import Disaster, Shelter, Volunteer,ContactMessage

admin.site.register(Disaster)
admin.site.register(Shelter)
admin.site.register(Volunteer)
admin.site.register(ContactMessage)


