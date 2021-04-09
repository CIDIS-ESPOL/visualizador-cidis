import { HttpRequestService } from 'src/app/Services/HTTP/http-request.service';
import { HttpUrl } from '../Constantes/http-url'
import { UidGrafana } from '../Constantes/uid-grafana'


export class Keeper{

    private sensor: string = "";

    private sensores = [];

    private links = new Map()

    constructor(){

        this.links.set("temperatura",{
            inicio : HttpUrl.urlGrafana + UidGrafana.uidSensorA + "4&var-Sensores=",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "14&var-Sensores=",

        })

        this.links.set("humedad",{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "10&var-Sensores=",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "18&var-Sensores=",
        })

        this.links.set("ph",{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "8&var-Sensores=",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "16&var-Sensores=",

        })

        this.links.set("precipitacion",{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "12&var-Sensores=",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "2&var-Sensores="
        })
    }

    public getSensorNames(){
        return this.sensores
    }

    public getEmbeddedUrl(key: string, atribute: string, sensor:string){
        return this.links.get(key)[atribute] + sensor
    }
    
    public getSensor(){
        return this.sensor;
    }

    public setSensor(sensor:string){
        this.sensor = sensor
    }

    public setSensores(sensores: any){
        this.sensores = sensores
    }

    
}