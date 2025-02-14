# models.py

from django.db import models

class ECGData(models.Model):
    ecgValue = models.IntegerField()
    timeStamp = models.BigIntegerField()  # Assuming it stores milliseconds since epoch

    def __str__(self):
        return f"ECG Data - {self.ecgValue}"

    class Meta:
        ordering = ['timeStamp']
