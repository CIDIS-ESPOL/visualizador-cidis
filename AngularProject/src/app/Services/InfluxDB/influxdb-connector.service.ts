import { HttpRequestService } from './../HTTP/http-request.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfluxdbConnectorService {

  private token = 'ykfqgonxlAdQQO1XBoNJWkyC4xM3f0N8JHZg3_ezo1NVTYX4cE3US1TpY_-xuXXfPwd2vO9oQpAqa5PiMCk9uA==';
  private org = 'ESPOL';
  private bucket = 'Prueba 3';

  private url = 'http://localhost:8086/api/v2/query?org=' + this.org

  private httpOptionsRest = {
    headers: new HttpHeaders({
        "content-type": "application/vnd.flux",
        "Authorization": "Token " + this.token,
        "Accept": "application/csv"
    })
};

  constructor(private httpService: HttpRequestService) {}


  executeInfluxDBQuery(myQuery: string): Array<String> {
    let retorno: Array<String> = []
    
    /*let query = 'from(bucket: { ' + this.bucket + '})\n' + myQuery

    let query = `
from(bucket: { Prueba 3})
|> range(start: -1h)
|> filter(fn: (r) => r["_measurement"] == "central")
|> keep(columns: ["sensor"])
|> distinct()`

from(bucket: "Prueba 3")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "central")
  |> filter(fn: (r) => r["_field"] == "temperatura")
  |> filter(fn: (r) => r["sensor"] == "SensorA")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")
*/
let query = `from(bucket: { Prueba 3})
|> range(start: -1h)
|> filter(fn: (r) => r["_measurement"] == "central")
|> keep(columns: ["sensor"])
|> distinct()`


    console.log(query)

    let body = {
      data: query
    }

    this.httpService.post(this.url,body,this.httpOptionsRest).then((res:any) =>{
      console.log(res)
    }).catch((error: any) =>{
      console.log(error)
    })

    return retorno;
  }


}
