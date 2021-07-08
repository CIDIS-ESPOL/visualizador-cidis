from rest_framework import serializers
from .models import Cultivo


class CultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivo
        fields = ('id',
        'nombre',
        'imagen',
        'minimo_temperatura',
        'maximo_temperatura',
        'minimo_humedad',
        'maximo_humedad',
        'minimo_precipitacion',
        'maximo_precipitacion',
        'minimo_radiacion',
        'maximo_radiacion')