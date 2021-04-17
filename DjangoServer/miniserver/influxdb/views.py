from django.shortcuts import render
from rest_framework import viewsets, permissions

from django.http import JsonResponse

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

from . import influxdbConnector

import sys
sys.path.insert(0, '..')

from cultivo.models import Cultivo
from cultivo.serializers import CultivoSerializer


# Create your views here.
@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def get_cultivos(request):
    if request.user.is_authenticated:
        bucket = request.data.get("bucket")
        result = influxdbConnector.get_cultivos(bucket)

        if result is not None:
            cultivos = Cultivo.objects.filter(nombre__in=result)
            serializer = CultivoSerializer(cultivos,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({'message': 'Error al obtener los cultivos'},status=status.HTTP_400_BAD_REQUEST)

    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def get_fincas(request):
    if request.user.is_authenticated:
        bucket = request.data.get("bucket")
        cultivo = request.data.get("cultivo")
        fincas = influxdbConnector.get_fincas(bucket,cultivo)
        if fincas is not None:
            message = {
                'fincas': fincas
            }
            return Response(message,status=status.HTTP_200_OK)
        return Response({'message': 'Error al obtener los cultivos'},status=status.HTTP_400_BAD_REQUEST)

    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)
