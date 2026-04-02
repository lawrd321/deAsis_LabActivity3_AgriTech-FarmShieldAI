from django.urls import path
from .views import FarmListCreateAPIView, FarmRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', FarmListCreateAPIView.as_view(), name='farm-list-create'),
    path('<int:pk>/', FarmRetrieveUpdateDestroyAPIView.as_view(), name='farm-detail'),
]