from django.shortcuts import render
from rest_framework import viewsets, permissions

from .models import Cultivo
from .serializers import CultivoSerializer

from django.http import JsonResponse
from rest_framework.response import Response

from rest_framework import status
from rest_framework import generics

from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CultivoSerializer

# Create your views here.
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def cultivos(request):
    if request.user.is_authenticated:
        data = Cultivo.objects.all()
        serializer = CultivoSerializer(data, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)
