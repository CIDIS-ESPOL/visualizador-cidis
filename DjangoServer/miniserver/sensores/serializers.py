from rest_framework import serializers
from .models import RaspBerry,Sensor

class RaspBerrySerializer(serializers.ModelSerializer):
	class Meta:
		model = RaspBerry
		fields = (
			'id',
			'cultivo', 
			'finca',
			'user',
		)

class SensorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Sensor
		fields = (
			'id',
			'latitud',
			'longitud',
			'cultivo', 
			'finca',
			'user',
		)
