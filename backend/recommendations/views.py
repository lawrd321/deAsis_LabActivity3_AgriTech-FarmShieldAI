from rest_framework import generics
from .models import Recommendation
from .serializers import RecommendationSerializer

class RecommendationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer

class RecommendationRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer