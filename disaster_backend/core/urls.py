from django.urls import path
from .views import (
    register_user,
    report_disaster,
    ListDisastersView,
    register_volunteer,
    list_shelters,
    list_volunteers,
    list_disasters,
    submit_contact_message,
    VolunteerListView,
    predict_resources,
    create_checkout_session
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth
    path('register/', register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Disasters
    path('disasters/report/', report_disaster, name='report_disaster'),
    path('disasters/', ListDisastersView.as_view(), name='list_disasters'),
    path('disasters/list/', list_disasters, name='filtered_disasters'),

    # Volunteers
    path('volunteer/register/', register_volunteer, name='register_volunteer'),
    path('volunteers/', VolunteerListView.as_view(), name='volunteer-list'),
    # path('volunteers/', list_volunteers, name='list_volunteers'),

    # Shelters
    path('shelters/', list_shelters, name='list_shelters'),
    
    path('contact/', submit_contact_message, name='submit-contact'),
    path('predict/' ,predict_resources,name = 'predict_resources'),
    path('create_checkout_session/' ,create_checkout_session,name = 'checkout'),
]
