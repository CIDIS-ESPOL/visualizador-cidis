from re import UNICODE
from django.shortcuts import render
from reportlab.lib.utils import ImageReader
from reportlab.platypus.flowables import Spacer
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
from django.http import FileResponse

import urllib.request
import urllib.parse
from datetime import date, datetime
from reportlab.lib.pagesizes import A4,letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch



from . import influxdbConnector

import io
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


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication,TokenAuthentication])
@permission_classes([AllowAny])
def get_images_grafana(request):
    if request.user.is_authenticated:

        buffer = io.BytesIO()

        filename = request.data.get('filename')
        textos = request.data.get('textos')
        urls = request.data.get("urls")

        document = []
        doc = SimpleDocTemplate(buffer, pagesize=letter, 
                rightMargin=72, leftMargin=72, 
                topMargin=72,bottomMargin=18)
        styles = getSampleStyleSheet()
        styles.add(ParagraphStyle(name='centeredHeading', alignment=TA_CENTER, fontSize=24, parent=styles['Heading1']))
        styles.add(ParagraphStyle(name='centeredHeading2', alignment=TA_CENTER, fontSize=16, parent=styles['Heading2']))
        
        document.append(Paragraph(textos[0], styles['centeredHeading']))
        document.append(Paragraph(textos[1], styles['centeredHeading2']))
        document.append(Spacer(1, 12))

        x=0

        for url in urls:
            document.append(Paragraph(textos[2+x], styles['Heading2']))
            img = Image(url, doc.width, 2.5 * inch)
            img.hAlign = 'LEFT'
            document.append(img)
            document.append(Spacer(1, 1.1 * inch))
            x += 1

        doc.build(document,onFirstPage=_header_footer, onLaterPages=_header_footer)

        now = datetime.now()
        # dd/mm/YY H:M:S
        dt_string = now.strftime("%d-%m-%Y-%H:%M:%S")

        name = dt_string + filename + ".pdf"

        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename=name)

    msg={
            'error':'Permission Denied!'
        }
    return Response(msg,status=status.HTTP_403_FORBIDDEN)


def _header_footer(canvas, doc):
    # Save the state of our canvas so we can draw on it
    canvas.saveState()
    styles = getSampleStyleSheet()

    # Header
    logo = "influxdb/pdf-utils/Logo-Crop-Sensing.png"
    header = Image(logo, 1.5 * inch, 0.5 * inch)
    header.hAlign = 'LEFT'
    #header = Paragraph('This is a multi-line header.  It goes on every page.   ' * 5, styles['Normal'])
    w, h = header.wrap(doc.width, doc.topMargin)
    header.drawOn(canvas, doc.leftMargin, doc.height + doc.topMargin - h)

    # Footer
    logo2 = "influxdb/pdf-utils/Logo-CIDIS.png"
    footer = Image(logo2, 2 * inch, 0.5 * inch)
    footer.hAlign = 'RIGHT'
    #footer = Paragraph('This is a multi-line footer.  It goes on every page.   ' * 5, styles['Normal'])
    w, h = footer.wrap(doc.width, doc.bottomMargin)
    footer.drawOn(canvas, doc.width - w/12, h)

    # Release the canvas
    canvas.restoreState()
