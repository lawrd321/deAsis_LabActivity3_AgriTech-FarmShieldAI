from rest_framework import generics
from .models import SensorReading
from .serializers import SensorReadingSerializer

class SensorReadingListCreateAPIView(generics.ListCreateAPIView):
    queryset = SensorReading.objects.all()
    serializer_class = SensorReadingSerializer

class SensorReadingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SensorReading.objects.all()
    serializer_class = SensorReadingSerializer