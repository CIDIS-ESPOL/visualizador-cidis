from finca.models import Finca
from users.models import Usuario
from django.db import models
from django.forms import ModelForm
from cultivo.models import Cultivo

# Create your models here.
class RaspBerry(models.Model):
    id = models.CharField(max_length=12,primary_key=True)
    cultivo = models.ForeignKey(Cultivo,on_delete=models.CASCADE)
    finca = models.ForeignKey(Finca,on_delete=models.CASCADE)
    user = models.ForeignKey(Usuario,on_delete=models.CASCADE)

    class RaspberryForm(ModelForm):
        class Meta:
            ordering = ["id"]
            verbose_name = "RaspBerry"
            unique_together = ['cultivo', 'finca','user']

    def __str__(self):
        return self.id


class Sensor(models.Model):
    id = models.CharField(max_length=12,primary_key=True)
    latitud = models.FloatField()
    longitud = models.FloatField()
    cultivo = models.ForeignKey(Cultivo,on_delete=models.CASCADE)
    finca = models.ForeignKey(Finca,on_delete=models.CASCADE)
    user = models.ForeignKey(Usuario,on_delete=models.CASCADE)

    class SensorForm(ModelForm):
        class Meta:
            ordering = ["id"]
            verbose_name = "Sensor"

    def __str__(self):
        return self.id