from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# You can generate a Token from the "Tokens Tab" in the UI
token = "ykfqgonxlAdQQO1XBoNJWkyC4xM3f0N8JHZg3_ezo1NVTYX4cE3US1TpY_-xuXXfPwd2vO9oQpAqa5PiMCk9uA=="
org = "ESPOL"

client = InfluxDBClient(url="http://localhost:8086", token=token)

def get_cultivos(bucket):
    try:
        query = f' import "influxdata/influxdb/schema" \
                    schema.measurementTagValues( \
                        bucket: "Tester", \
                        tag: "planta",\
                        predicate: (r) => r["_measurement"] == "temperatura" and \
                        r["usuario"] == "{bucket}", \
                        start: -30d \
                        )'
        
        result = client.query_api().query(query, org=org)
        cultivos = []
        for table in result:
            for record in table.records:
                cultivos.append(record.get_value())

        return cultivos
    except:
        return None

def get_fincas(bucket,cultivo):
    try:
        query = f' import "influxdata/influxdb/schema" \
                    schema.tagValues( \
                    bucket: "Tester", \
                    tag: "finca", \
                    predicate: (r) => r["_measurement"] == "temperatura" and \
                    r["usuario"] == "{bucket}", \
                    r["planta"] == "{cultivo}", \
                    start: -30d \
                    )'
        result = client.query_api().query(query, org=org)
        fincas = []
        for table in result:
            for record in table.records:
                fincas.append(record.get_value())

        return fincas
    except Exception as e:
        print(e)
        return None

