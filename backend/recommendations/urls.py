from django.urls import path
from .views import RecommendationListCreateAPIView, RecommendationRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', RecommendationListCreateAPIView.as_view(), name='recommendation-list-create'),
    path('<int:pk>/', RecommendationRetrieveUpdateDestroyAPIView.as_view(), name='recommendation-detail'),
]