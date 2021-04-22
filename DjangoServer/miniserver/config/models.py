from django.db import models
from django.utils.dateparse import parse_date
from django.forms import ModelForm
from django.contrib.auth.models import User

# Create your models here.
class Configuracion_Grafana(models.Model):

    url = models.CharField(max_length=200)
    render = models.CharField(max_length=200, blank=True)
    complement = models.CharField(max_length=200, blank=True)
    temperatura_inicio = models.IntegerField(default=0)
    temperatura_historico = models.IntegerField(default=0) 
    presion_inicio = models.IntegerField(default=0)
    presion_historico = models.IntegerField(default=0)
    humedad_inicio = models.IntegerField(default=0)
    humedad_historico = models.IntegerField(default=0)
    uv_inicio = models.IntegerField(default=0)
    uv_historico = models.IntegerField(default=0)
    comparacion = models.IntegerField(default=0)
    medidas_variable = models.CharField(max_length=200)
    buckets_variable = models.CharField(max_length=200)
    cultivos_variable = models.CharField(max_length=200)
    finca_variable = models.CharField(max_length=200)
    finca2_variable = models.CharField(max_length=200)

    class Configuracion_GrafanaForm(ModelForm):
        class Meta:
            ordering = ["url"]
            verbose_name = "Configuracion_Grafana"

    def __str__(self):
        return "Configuracion_Grafana"
