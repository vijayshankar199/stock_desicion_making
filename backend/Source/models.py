from django.db import models

# Create your models here.

class StockDecision(models.Model):
    
    name = models.CharField(max_length=50)
    price = models.FloatField(default=0)
    signal = models.CharField(max_length=20)
    confidence = models.IntegerField()
    target = models.FloatField()
    stop_loss = models.FloatField()

    def _str_(self):
        return f"{self.name}" - f"{self.signal}"