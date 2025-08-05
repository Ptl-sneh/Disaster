from rest_framework import status,generics,viewsets
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import UserRegisterSerializer,ShelterSerializer,VolunteerSerializer,DisasterSerializer,ContactMessageSerializer
from .models import Disaster,Shelter,Volunteer,ContactMessage
import requests

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

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def register_volunteer(request):
#     data = request.data.copy()
#     data['user'] = request.user.id
#     serializer = VolunteerSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
