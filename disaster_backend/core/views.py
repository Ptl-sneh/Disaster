from rest_framework import status,generics,viewsets
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import UserRegisterSerializer,ShelterSerializer,VolunteerSerializer,DisasterSerializer,ContactMessageSerializer,PredictedValuesSerializer
from django.conf import settings
from django.http import JsonResponse
from .models import Disaster,Shelter,Volunteer,ContactMessage,PredictedValues
import requests
import os 
import joblib
import numpy as np
import pandas as pd
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json,os


stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
def geocode_address(address):
    key = 'ee92ecdd73ea4e38b10bd8553e5f0856'
    url = f"https://api.opencagedata.com/geocode/v1/json"
    params = {'q': address, 'key': key}
    r = requests.get(url, params=params)
    results = r.json()
    if results['results']:
        latlng = results['results'][0]['geometry']
        return latlng['lat'], latlng['lng']
    return None, None


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_disaster(request):
    address = request.data.get('address')
    print("📮 Received address from frontend:", address)

    lat, lon = geocode_address(address)
    print("📍 Geocoded lat/lon:", lat, lon)

    if not lat or not lon:
        return Response({"error": "Could not locate address."}, status=400)

    data = request.data.copy()
    data['latitude'] = lat
    data['longitude'] = lon

    serializer = DisasterSerializer(data=data)
    if serializer.is_valid():
        serializer.save(reported_by=request.user)
        return Response(serializer.data, status=201)
    else:
        print("❌ Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=400)

class ListDisastersView(generics.ListAPIView):
    queryset = Disaster.objects.filter(is_verified=True).order_by('-timestamp')
    serializer_class = DisasterSerializer
    permission_classes = [AllowAny]
    
@api_view(['GET'])
def list_shelters(request):
    shelters = Shelter.objects.all()
    serializer = ShelterSerializer(shelters, many=True)
    return Response(serializer.data)

class ShelterViewSet(viewsets.ModelViewSet):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_volunteer(request):
    user = request.user
    data = request.data.copy()

    serializer = VolunteerSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # You can change to IsAuthenticated if you want to protect it
def list_volunteers(request):
    volunteers = Volunteer.objects.all()
    serializer = VolunteerSerializer(volunteers, many=True)
    permission_classes = [AllowAny]  # ✅ This makes it public
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_disasters(request):
    disasters = Disaster.objects.all()

    # Get query params safely
    disaster_type = request.query_params.get('type', None)
    verified = request.query_params.get('verified', None)

    # Filter by disaster_type
    if disaster_type:
        disasters = disasters.filter(type__iexact=disaster_type)


    # Filter by verified
    if verified is not None:
        if verified.lower() == 'true':
            disasters = disasters.filter(is_verified=True)
        elif verified.lower() == 'false':
            disasters = disasters.filter(is_verified=False)

    serializer = DisasterSerializer(disasters, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def submit_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message submitted successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        print("🔥 Volunteers fetched:", Volunteer.objects.all())
        return super().get(request, *args, **kwargs)


def predict_resources(request):
    model_path = os.path.join(settings.BASE_DIR, 'core', 'scripts', 'shelter_resources.pkl')
    model = joblib.load(model_path)
    
    shelters = Shelter.objects.all()
    results = []
    for shelter in shelters:
        try:
            current_occupancy = shelter.current_occupancy
            capacity = shelter.capacity

            # Derived features
            occupancy_rate = current_occupancy / capacity
            empty_beds = capacity - current_occupancy
            is_full = int(current_occupancy == capacity)

            input_data = pd.DataFrame([{
                'current_occupancy': current_occupancy,
                'capacity': capacity,
                'occupancy_rate': occupancy_rate,
                'empty_beds': empty_beds,
                'is_full': is_full
            }])

            prediction = model.predict(input_data)[0]
            food, water, kits_per_person, volunteers_per_person = prediction

            medical_kits = int(kits_per_person * current_occupancy)
            volunteers_required = int(volunteers_per_person * current_occupancy)

            # Save prediction
            prediction_obj, created = PredictedValues.objects.update_or_create(
                name=shelter,
                defaults={
                    'food_needed': round(food),
                    'water_required': round(water),
                    'medical_kits': medical_kits,
                    'Volunteers_required': volunteers_required
                }
            )

            results.append({
                'shelter': shelter.name,
                'food_needed': prediction_obj.food_needed,
                'water_required': prediction_obj.water_required,
                'medical_kits': prediction_obj.medical_kits,
                'Volunteers_required': prediction_obj.Volunteers_required
            })

        except Exception as e:
            results.append({'shelter': shelter.name, 'error': str(e)})

    return JsonResponse({'predictions': results})

price_lookup = {
    'free':'price_1Rtphq1yRBtzWAxgFFrCCxI2',
    'verified-org': 'price_1RtoTB1yRBtzWAxgXWH5GlY1',
    'shelter-promo': 'price_1RtoUE1yRBtzWAxgAQ6pDfeq',
    'analytics': 'price_1RtoUk1yRBtzWAxgekYuOdgM',
    'enterprise': 'price_1RtoVB1yRBtzWAxghL3PHL9R',
}
@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print('hi',data)
        plan_id = data.get('planId')

        price_id = price_lookup.get(plan_id)

        if not price_id:
            return JsonResponse({'error': 'Invalid plan ID'}, status=400)

        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': price_id,
                    'quantity': 1,
                }],
                mode='subscription',
                success_url='http://localhost:3000/pricing',
                cancel_url='http://localhost:3000/dashboard',
            )
            return JsonResponse({'id': session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)