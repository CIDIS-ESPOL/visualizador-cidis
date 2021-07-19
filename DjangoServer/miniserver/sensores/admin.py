from django.contrib import admin
from .models import RaspBerry,Sensor

# Register your models here.
admin.site.register(RaspBerry)
admin.site.register(Sensor)