from django.urls import path
from .views import SensorReadingListCreateAPIView, SensorReadingRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', SensorReadingListCreateAPIView.as_view(), name='reading-list-create'),
    path('<int:pk>/', SensorReadingRetrieveUpdateDestroyAPIView.as_view(), name='reading-detail'),
]