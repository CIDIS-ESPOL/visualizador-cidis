from cultivo.serializers import CultivoSerializer
from cultivo.models import Cultivo
from django.shortcuts import render
from rest_framework import viewsets, permissions

from django.http import JsonResponse

from .models import Usuario

from .serializers import UserSerializer
from .serializers import UsuarioSerializer

from . import decrypt
import json

from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework import generics

from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from django.contrib.auth import authenticate, login
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer


# Create your views here.
#Get if User have active Token
#Unique Token for User
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def isActiveToken(request,user):
    active=Token.objects.filter(user=user).exists()
    data = {'active': active}
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login(request):

    raw = request.data.get('raw')
    decrypted = decrypt.decrypt(raw)

    data = json.loads(decrypted)

    serializer = ObtainAuthToken.serializer_class(
        data=data, context={'request': request})
        
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        usuario = Usuario.objects.get(user=user)
        token, created = Token.objects.get_or_create(user=user) 
        data = {
            "message": 'Logged In',
            "username": usuario.user.username,
            "bucket": usuario.bucket_name,
            'Auth-token': token.key,
        }
        return Response(data, status=HTTP_200_OK)

    return Response({'error': 'User not authorized'}, status=HTTP_404_NOT_FOUND)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def get_cultivos(request):
    if request.user.is_authenticated:
        bucket = request.data.get("bucket")
        
        result = generics.get_object_or_404(Usuario,bucket_name=bucket)

        if result is not None:
            cultivos = result.cultivos.all()
            serializer = CultivoSerializer(cultivos,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({'message': 'Error al obtener los cultivos'},status=status.HTTP_400_BAD_REQUEST)

    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)
    
        
