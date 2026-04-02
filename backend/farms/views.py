from rest_framework import generics
from .models import Farm
from .serializers import FarmSerializer

class FarmListCreateAPIView(generics.ListCreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

class FarmRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer