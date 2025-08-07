from django.contrib import admin
from .models import Disaster, Shelter, Volunteer,ContactMessage,ShelterImage,PredictedValues

admin.site.register(Disaster)
admin.site.register(Shelter)
admin.site.register(Volunteer)
admin.site.register(ContactMessage)
admin.site.register(ShelterImage)
admin.site.register(PredictedValues)

