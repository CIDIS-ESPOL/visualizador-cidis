from finca.models import Finca
from cultivo.models import Cultivo
from users.models import Usuario
from django.shortcuts import render
from rest_framework import viewsets, permissions

from django.http import JsonResponse

from .models import RaspBerry,Sensor

from .serializers import RaspBerrySerializer,SensorSerializer

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
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class RaspBerryViewSet(viewsets.ModelViewSet):
    queryset = RaspBerry.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RaspBerrySerializer

class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SensorSerializer

# Create your views here.
@api_view(['GET','POST','PUT','DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def rapsberry(request, id):

    if(request.method=='GET'):
        data = generics.get_object_or_404(RaspBerry,id=id)
        if data is not None:
            respuesta = {
                'cultivo': data.cultivo.nombre,
                'finca': data.finca.nombre,
                'user': data.user.bucket_name
            }
            return Response(respuesta,status=status.HTTP_200_OK)
        return Response({'message': 'RaspBerry no existe'},status=status.HTTP_400_BAD_REQUEST)

    elif(request.method=='POST' and request.user.is_authenticated):
        serializer = RaspBerrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  

    elif(request.method=='PUT' and request.user.is_authenticated):
        data = generics.get_object_or_404(RaspBerry,id=id)
        if data is not None:
            serializer = RaspBerrySerializer(data, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'RaspBerry no existe'},status=status.HTTP_400_BAD_REQUEST)

    elif(request.method=='DELETE' and request.user.is_authenticated):
        data = generics.get_object_or_404(RaspBerry,id=id)
        if data is not None:
            data.delete()
            msg={
                'message':'RaspBerry eliminado exitosamente'
            }
            return Response(msg,status=status.HTTP_200_OK)
        return Response({'message': 'RaspBerry no existe'},status=status.HTTP_400_BAD_REQUEST)

    else:
        msg={
            'error':'Permission Denied!'
        }
        return Response(msg,status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def sensoresAll(request,bucket):
    if request.user.is_authenticated:
        result = generics.get_object_or_404(Usuario,bucket_name=bucket)

        if result is not None:
            data = Sensor.objects.filter(user=result)
            sensores = []
            for sensor in data:
            	objeto = {
            		'id': sensor.id,
            		'cultivo': sensor.cultivo.nombre,
            		'finca': sensor.finca.nombre,
            	}
            	sensores.append(objeto)
            
            respuesta = {
            	'data': sensores
            }
            
            return Response(respuesta,status=status.HTTP_200_OK)
    msg={
        'error':'Permission Denied!'
    }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def sensoresR(request,cultivo,finca,bucket):
    cultivoR = generics.get_object_or_404(Cultivo,nombre=cultivo)
    fincaR = generics.get_object_or_404(Finca,nombre=finca)
    usuario = generics.get_object_or_404(Usuario,bucket_name=bucket)

    if cultivoR is not None and fincaR is not None and usuario is not None:
        data = Sensor.objects.filter(cultivo=cultivoR,finca=fincaR,user=usuario)
        serializer = SensorSerializer(data, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response({'message': 'Error al obtener los sensores'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST','PUT','DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def sensor(request, id):

    if(request.method=='GET'):
        data = generics.get_object_or_404(Sensor,id=id)
        if data is not None:
            serializer = SensorSerializer(data, many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({'message': 'Sensor no existe'},status=status.HTTP_400_BAD_REQUEST)

    elif(request.method=='POST' and request.user.is_authenticated):

        cultivo = request.data.get('cultivo')
        finca = request.data.get('finca')
        bucket = request.data.get('bucket')

        cultivoR = generics.get_object_or_404(Cultivo,nombre=cultivo)
        fincaR = generics.get_object_or_404(Finca,nombre=finca)
        usuario = generics.get_object_or_404(Usuario,bucket_name=bucket)

        data = {
            'id': id,
            'latitud': 0,
            'longitud': 0,
            'cultivo': cultivoR.id,
            'finca': fincaR.id,
            'user': usuario.id
        }

        serializer = SensorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  

    elif(request.method=='PUT' and request.user.is_authenticated):
        data = generics.get_object_or_404(Sensor,id=id)
        
        if data is not None:
            datos = {}
            cultivo = request.data.get('cultivo')
            finca = request.data.get('finca')

            if cultivo is not None:
                cultivoR = generics.get_object_or_404(Cultivo,nombre=cultivo)
                datos['cultivo'] = cultivoR.id

            if finca is not None:
                fincaR = generics.get_object_or_404(Finca,nombre=finca)
                datos['finca'] = fincaR.id
                
            serializer = SensorSerializer(data, data=datos, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Sensor no existe'},status=status.HTTP_400_BAD_REQUEST)

    elif(request.method=='DELETE' and request.user.is_authenticated):
        data = generics.get_object_or_404(Sensor,id=id)
        if data is not None:
            data.delete()
            msg={
                'message':'Sensor eliminado exitosamente'
            }
            return Response(msg,status=status.HTTP_200_OK)
        return Response({'message': 'Sensor no existe'},status=status.HTTP_400_BAD_REQUEST)

    else:
        msg={
            'error':'Permission Denied!'
        }
        return Response(msg,status=status.HTTP_403_FORBIDDEN)
