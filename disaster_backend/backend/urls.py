from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core.views import list_shelters,register_volunteer,list_volunteers,list_disasters,ListDisastersView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/shelters/', list_shelters),
    path('api/volunteer/register/', register_volunteer),
    path('api/volunteers/', list_volunteers),
    path('api/disasters/', ListDisastersView.as_view()),
    path('api/disasters/list/', list_disasters),


]

# To serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
