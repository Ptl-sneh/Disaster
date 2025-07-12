from django.urls import path
from .views import register_user, report_disaster, ListDisastersView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('disasters/report/', report_disaster, name='report_disaster'),
    path('disasters/', ListDisastersView.as_view(), name='list_disasters'),
]
