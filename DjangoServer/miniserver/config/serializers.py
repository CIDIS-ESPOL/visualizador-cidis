from rest_framework import serializers
from .models import Configuracion_Grafana

class Configuracion_GrafanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuracion_Grafana
        fields = ('id','url','temperatura_inicio','temperatura_historico','presion_inicio','presion_historico','humedad_inicio','humedad_historico','buckets_variable','cultivos_variable','finca_variable')