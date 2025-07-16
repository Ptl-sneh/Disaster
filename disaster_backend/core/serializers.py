from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Disaster,Shelter,Volunteer,ContactMessage


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

from rest_framework import serializers
from .models import Disaster

class DisasterSerializer(serializers.ModelSerializer):
    reported_by = serializers.SerializerMethodField()

    class Meta:
        model = Disaster
        fields = '__all__'
        read_only_fields = ['reported_by', 'is_verified', 'timestamp']

    def get_reported_by(self, obj):
        full_name = obj.reported_by.get_full_name()
        if full_name.strip():
            return full_name
        return obj.reported_by.username

        
class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'

class VolunteerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Volunteer
        fields = '__all__'
        read_only_fields = ['user', 'email', 'registered_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['submitted_at']

