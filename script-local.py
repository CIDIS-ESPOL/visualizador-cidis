from time import sleep, time, time_ns
import pandas as pd
import serial
import random
import requests
import json

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

tiempo=1

# You can generate a Token from the "Tokens Tab" in the UI
token = "ykfqgonxlAdQQO1XBoNJWkyC4xM3f0N8JHZg3_ezo1NVTYX4cE3US1TpY_-xuXXfPwd2vO9oQpAqa5PiMCk9uA=="
org = "ESPOL"
bucket = "Tester"

client = InfluxDBClient(url="http://localhost:8086", token=token)

write_api = client.write_api(write_options=SYNCHRONOUS)

'''
aduino = serial.Serial('/dev/ttyUSB0',9600)
arduino.flushInput()
'''

df = pd.read_csv("data.csv",sep=';')

id = "TEST-0000001"

response =requests.get('http://localhost:4000/info/sensor/raspberry/' + id)
datos = json.loads(response.content.decode())

cultivo = datos['cultivo']
finca = datos['finca']
user = datos['user']

response =requests.get('http://localhost:4000/info/sensor/getsensoresR/' + cultivo + '/' + finca + '/' + user)
datos = json.loads(response.content.decode())

sensores = {}

nombre_sensores = []

for sensor in datos:
	sensores[sensor['id']] = [sensor['latitud'],sensor['longitud']]
	nombre_sensores.append(sensor['id'])

data = {
	"cultivo": cultivo
}

response =requests.get('http://localhost:4000/info/cultivo/getCultivo',data=data)
datos = json.loads(response.content.decode())

minimo_temperatura = datos["minimo_temperatura"]
maximo_temperatura = datos["maximo_temperatura"]

minimo_humedad = datos["minimo_humedad"]
maximo_humedad = datos["maximo_humedad"]

minimo_precipitacion = datos["minimo_precipitacion"]
maximo_precipitacion = datos["maximo_precipitacion"]

minimo_radiacion = datos["minimo_radiacion"]
maximo_radiacion = datos["maximo_radiacion"]


while True:
	try:
		
		for d in range(len(df)):
			print("Activo, leyendo linea #"+str((d+1))+"...")
			#name = str(df["nombre"][d]).replace(" ", "")
			numero = random.randint(0,len(nombre_sensores) - 1)
			name = nombre_sensores[numero]
			latitud = sensores[name][0]
			longitud = sensores[name][1]
			#planta = cultivos[random.randint(0,3)]
			temperatura = df["temperatura"][d]
			#temperatura = words[1].replace(",","")
			precipitacion = (random.random() * 10)
			#presion = words[2].replace(",","")
			humedad = df["humedad"][d]
			#humedad = words[3].replace(",","")
			uv = random.randint(0,15)
			tiempo_ns = time_ns()
			
			point_temperatura = Point("temperatura")\
				.tag("planta",cultivo)\
				.tag("finca",finca)\
				.tag("id_sensor", name)\
				.tag("usuario", user)\
				.field("valor",temperatura)\
				.field("minimo",minimo_temperatura)\
				.field("maximo",maximo_temperatura)\
				.field("latitud",latitud)\
				.field("longitud",longitud)\
				.time(tiempo_ns, WritePrecision.NS)

			point_humedad = Point("humedad")\
				.tag("planta",cultivo)\
				.tag("finca",finca)\
				.tag("id_sensor", name)\
				.tag("usuario", user)\
				.field("valor",humedad)\
				.field("minimo",minimo_humedad)\
				.field("maximo",maximo_humedad)\
				.field("latitud",latitud)\
				.field("longitud",longitud)\
				.time(tiempo_ns, WritePrecision.NS)

			point_precipitacion = Point("precipitacion")\
				.tag("planta",cultivo)\
				.tag("finca",finca)\
				.tag("id_sensor", name)\
				.tag("usuario", user)\
				.field("valor",precipitacion)\
				.field("minimo",minimo_precipitacion)\
				.field("maximo",maximo_precipitacion)\
				.field("latitud",latitud)\
				.field("longitud",longitud)\
				.time(tiempo_ns, WritePrecision.NS)

			point_uv = Point("uv")\
				.tag("planta",cultivo)\
				.tag("finca",finca)\
				.tag("id_sensor", name)\
				.tag("usuario", user)\
				.field("valor",uv)\
				.field("minimo",minimo_radiacion)\
				.field("maximo",maximo_radiacion)\
				.field("latitud",latitud)\
				.field("longitud",longitud)\
				.time(tiempo_ns, WritePrecision.NS)

			write_api.write(bucket, org, point_temperatura)
			write_api.write(bucket, org, point_humedad)
			write_api.write(bucket, org, point_precipitacion)
			write_api.write(bucket, org, point_uv)
			print("A dormir por" + str(tiempo) + " segundos")
			sleep(tiempo)
	except KeyboardInterrupt:
		print('Received order to stop')
		break
	
	
    