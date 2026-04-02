from django.db import models

class Farm(models.Model):
    farmer_name = models.CharField(max_length=100)
    farm_name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    crop_type = models.CharField(max_length=100)
    farm_size = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.farm_name