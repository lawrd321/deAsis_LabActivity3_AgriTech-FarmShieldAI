from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/farms/', include('farms.urls')),
    path('api/readings/', include('monitoring.urls')),
    path('api/recommendations/', include('recommendations.urls')),
]