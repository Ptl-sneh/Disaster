from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # 👈 This includes all API routes from the core app
    # path('', include('core.urls')),  # ✅ Include your app routes
]

urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
