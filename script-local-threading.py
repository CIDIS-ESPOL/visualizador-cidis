from time import sleep, time, time_ns
import pandas as pd
import serial
import random

import requests
import json

import threading

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

tiempo=1

# You can generate a Token from the "Tokens Tab" in the UI
token = "ykfqgonxlAdQQO1XBoNJWkyC4xM3f0N8JHZg3_ezo1NVTYX4cE3US1TpY_-xuXXfPwd2vO9oQpAqa5PiMCk9uA=="
org = "ESPOL"
bucket = "Tester"

client = InfluxDBClient(url="http://localhost:8086", token=token)

write_api = client.write_api(write_options=SYNCHRONOUS)

user = "Prueba"

'''
aduino = serial.Serial('/dev/ttyUSB0',9600)
arduino.flushInput()
'''

cultivos = ["maiz", "papa", "cebolla", "tomate"]


df = pd.read_csv("data.csv",sep=';')

sensores = [
	"SensorA",
	"SensorB",
	"SensorC",
	"SensorD",
	"SensorE"
]

coordenadas = {
	"SensorA": [-2.0592336490950363, -79.9100491057847],
	"SensorB": [-2.060992040923297, -79.8947712436248],
	"SensorC": [-2.0691835479639873, -79.90987744441212],
	"SensorD": [-2.069312210041173, -79.9185892590707],
	"SensorE": [-2.052500277094427, -79.90361180431282]
}

fincas = [
	"ESPOL",
	"La Gloria",
	"Teresita",
	"Jesús, el Gran Poder",
	"El Manaba"
]

class myThread (threading.Thread):
	def __init__(self, threadID, cultivo):
		threading.Thread.__init__(self)
		self.threadID = threadID
		self.name = cultivo
	
	def run(self):
		cultivo =  self.name

		data = {
			"cultivo": cultivo
		}

		response =requests.get('http://localhost:4000/info/getCultivo',data=data)
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
			for d in range(len(df)):
				#print("Activo, leyendo linea #"+str((d+1))+"...")
				#name = str(df["nombre"][d]).replace(" ", "")
				name = sensores[random.randint(0,4)]
				latitud = coordenadas[name][0]
				longitud = coordenadas[name][1]
				#planta = cultivos[random.randint(0,3)]
				finca = fincas[random.randint(0,4)]
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
				print("%s - %s" % (cultivo,name))
				sleep(tiempo)



def endThreads(cultivos, threads):
	for cultivo in cultivos:
		print("Terminando Hilo de cultivo: %s" % (cultivo))
		cultivo.exit()

	for thread in threads:
		thread.join()

	print("Recogido todos los hilos")


threads = []
id = 0

for cultivo in cultivos:
	id+=1
	thread = myThread(id,cultivo=cultivo)
	threads.append(thread)

for thread in threads:
	thread.start()

while True:
	try:
		pass
	except KeyboardInterrupt:
		print("Received order to stop")
		endThreads(cultivos=cultivos,threads=threads)
		break




