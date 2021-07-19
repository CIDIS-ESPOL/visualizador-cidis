from users.models import Usuario
from django.shortcuts import render
from rest_framework import viewsets, permissions

from django.http import JsonResponse

from .models import Finca

from .serializers import FincaSerializer

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

class FincaViewSet(viewsets.ModelViewSet):
    queryset = Finca.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FincaSerializer

# Create your views here.
@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def get_fincas(request):
    if request.user.is_authenticated:
        bucket = request.data.get("bucket")
        
        result = generics.get_object_or_404(Usuario,bucket_name=bucket)

        if result is not None:
            fincas = Finca.objects.filter(user=result)
            lista = []
            if len(fincas) > 0:
                for finca in fincas:
                    lista.append(finca.nombre)
                
                message = {
                    'fincas': lista
                }
                return Response(message,status=status.HTTP_200_OK)
            return Response({'message': 'Usuario no tiene fincas'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Error al obtener las fincas'},status=status.HTTP_400_BAD_REQUEST)

    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)
