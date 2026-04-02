from django.db import models
from farms.models import Farm

class Recommendation(models.Model):
    RISK_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='recommendations')
    disease_risk = models.CharField(max_length=10, choices=RISK_CHOICES)
    irrigation_needed = models.BooleanField(default=False)
    water_amount = models.FloatField(default=0.0)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.farm.farm_name} - {self.disease_risk}"