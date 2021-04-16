from time import sleep, time, time_ns
import pandas as pd
import serial
import random

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

tiempo=1

# You can generate a Token from the "Tokens Tab" in the UI
token = "ykfqgonxlAdQQO1XBoNJWkyC4xM3f0N8JHZg3_ezo1NVTYX4cE3US1TpY_-xuXXfPwd2vO9oQpAqa5PiMCk9uA=="
org = "ESPOL"
bucket = "Tester"

client = InfluxDBClient(url="http://192.168.100.11:8086", token=token)

write_api = client.write_api(write_options=SYNCHRONOUS)

'''
aduino = serial.Serial('/dev/ttyUSB0',9600)
arduino.flushInput()
'''


df = pd.read_csv("data.csv",sep=';')

coordenadas = {
	"SensorA": [-2.059503, -79.903884],
	"SensorB": [-2.059637, -79.903812],
	"SensorC": [-2.059538, -79.904002],
	"SensorD": [-2.059643, -79.903936],
	"SensorE": [-2.059589, -79.903920]
}

cultivos = ["maiz", "papa", "cebollas", "tomate"]

fincas = {
	"SensorA": "ESPOL",
	"SensorB": "La\ Gloria",
	"SensorC": "Teresita",
	"SensorD": "Jesús\,\ el\ Gran\ Poder",
	"SensorE": "El\ Manaba"
}

while True:
	try:
		'''
		datosBytes = arduino.readline()
		datos = datosBytes.decode('latin-1').strip()
		words = datos.split()
		'''
		for d in range(len(df)):
			print("Activo, leyendo linea #"+str((d+1))+"...")
			name = str(df["nombre"][d]).replace(" ", "")
			latitud = coordenadas[name][0]
			longitud = coordenadas[name][1]
			planta = cultivos[random.randint(0,3)]
			finca = fincas[name]
			temperatura = str(df["temperatura"][d])
			#temperatura = words[1].replace(",","")
			presion = str(((random.random() * 100) + 950))
			#presion = words[2].replace(",","")
			humedad = str(df["humedad"][d])
			#humedad = words[3].replace(",","")
			linea = planta + ",finca="+ finca + " " + "temperatura=" + temperatura + "," + "presion=" + presion + "," + "humedad=" + humedad + "," + "latitud=" + str(latitud) + "," + "longitud=" + str(longitud) + " " + str(time_ns())
			print(linea)
			write_api.write(bucket, org, linea)
			print("A dormir por" + str(tiempo) + " segundos")
			sleep(tiempo)
	except KeyboardInterrupt:
		print('Received order to stop')
		break
		
	
    


'''
for d in range(len(df)):
        print("Activo, leyendo linea #"+str((d+1))+"...")
        name = str(df["nombre"][d]).replace(" ", "")
        latitud = coordenadas[name][0]
        longitud = coordenadas[name][1]
        linea = "central" + ",sensor="+ name + " " + "temperatura=" + str(df["temperatura"][d]) + "," + "humedad=" + str(df["humedad"][d]) + "," + "ph=" + str(df["ph"][d]) + "," + "precipitacion=" + str(df["precipitacion"][d]) + "," + "latitud=" + str(latitud) + "," + "longitud=" + str(longitud) + " " + str(time_ns())
        print(linea)
        write_api.write(bucket, org, linea)
        print("A dormir por" + str(tiempo) + " segundos")
        sleep(tiempo)


lines = ["price"
         + ",type=BTC"
         + " "
         + "close=" + str(df["close"][d]) + ","
         + "high=" + str(df["high"][d]) + ","
         + "low=" + str(df["low"][d]) + ","
         + "open=" + str(df["open"][d]) + ","
         + "volume=" + str(df["volume"][d])
         + " " + str(time_ns()) for d in range(len(df))]

write_api.write(bucket, org, lines)
'''

