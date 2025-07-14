from rest_framework import status,generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import UserRegisterSerializer,ShelterSerializer,VolunteerSerializer,DisasterSerializer,ContactMessageSerializer
from .models import Disaster,Shelter,Volunteer,ContactMessage


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
    serializer = DisasterSerializer(data=request.data)
    if serializer.is_valid():
        # Save with reported_by as the logged-in user
        serializer.save(reported_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ListDisastersView(generics.ListAPIView):
    queryset = Disaster.objects.filter(is_verified=True).order_by('-timestamp')
    serializer_class = DisasterSerializer
    permission_classes = [AllowAny]
    
@api_view(['GET'])
def list_shelters(request):
    shelters = Shelter.objects.all()
    serializer = ShelterSerializer(shelters, many=True)
    return Response(serializer.data)

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