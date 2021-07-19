from time import sleep, time, time_ns
import pandas as pd
import serial
import random
import requests
import json

id = "TEST-0000001"

response =requests.get('http://localhost:4000/info/sensor/raspberry/' + id)
datos = json.loads(response.content.decode())

cultivo = datos['cultivo']
finca = datos['finca']
bucket = datos['user']

response =requests.get('http://localhost:4000/info/sensor/getsensoresR/' + cultivo + '/' + finca + '/' + bucket)
datos = json.loads(response.content.decode())

sensores = {}
nombre_sensores = []

for sensor in datos:
	sensores[sensor['id']] = [sensor['latitud'],sensor['longitud']]
	nombre_sensores.append(sensor['id'])

print(sensores)
print(nombre_sensores)
print(len(nombre_sensores))

data = {
	"cultivo": cultivo
}

response =requests.get('http://localhost:4000/info/cultivo/getCultivo',data=data)
datos = json.loads(response.content.decode())

print(datos)


