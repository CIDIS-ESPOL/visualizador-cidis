from django.shortcuts import render
from rest_framework import viewsets, permissions

from django.http import JsonResponse

from .models import Configuracion_Grafana

from .serializers import Configuracion_GrafanaSerializer

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

class Configuracion_GrafanaViewSet(viewsets.ModelViewSet):
    queryset = Configuracion_Grafana.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Configuracion_GrafanaSerializer

# Create your views here.
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def get_configuracion(request):
    if request.user.is_authenticated:
        data = generics.get_object_or_404(Configuracion_Grafana,id=1)
        if data is not None:
            serializer = Configuracion_GrafanaSerializer(data, many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({'message': 'Configuracion no existe'},status=status.HTTP_400_BAD_REQUEST)

    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)
