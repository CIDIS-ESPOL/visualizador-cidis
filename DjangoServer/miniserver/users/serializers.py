from rest_framework import serializers
from .models import Usuario

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username', 'password','first_name', 'last_name', 'email')

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id','user','bucket_name')