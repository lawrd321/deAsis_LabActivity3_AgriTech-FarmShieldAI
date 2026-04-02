from django.db import models
from farms.models import Farm

class SensorReading(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='readings')
    soil_moisture = models.FloatField()
    soil_temperature = models.FloatField()
    air_temperature = models.FloatField()
    humidity = models.FloatField()
    leaf_wetness = models.FloatField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.farm.farm_name} - {self.recorded_at}"