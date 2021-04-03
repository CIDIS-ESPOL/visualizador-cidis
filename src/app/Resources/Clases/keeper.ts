import { HttpUrl } from '../Constantes/http-url'
import { UidGrafana } from '../Constantes/uid-grafana'

export class Keeper{

    private sensor: string = "Sensor A";

    private sensores = new Map();

    private linksA = {
        temperatura: {
            inicio : HttpUrl.urlGrafana + UidGrafana.uidSensorA + "4",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "14",

        },
        humedad: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "10",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "6",

        },
        ph:{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "8",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "16",

        },
        precipitacion: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "12",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorA + "2"
        }
    }

    private linksB = {
        temperatura: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "4",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "12",

        },
        humedad: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "8",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "6",

        },
        ph:{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "2",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "11",
        },
        precipitacion: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "9",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorB + "10",

        }
    }

    private linksC = {
        temperatura: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "4",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "12",

        },
        humedad: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "9",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "6",

        },
        ph:{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "8",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "11",

        },
        precipitacion: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "10",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorC + "2",

        }
    }

    private linksD = {
        temperatura: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "4",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "11",
        },
        humedad: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "10",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "6"
        },
        ph:{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "8",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "12",
        },
        precipitacion: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "9",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorD + "2",
        }
    }

    private linksE = {
        temperatura: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "4",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "11",
        },
        humedad: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "9",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "6",
        },
        ph:{
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "8",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "12",
        },
        precipitacion: {
            inicio: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "10",
            historico: HttpUrl.urlGrafana + UidGrafana.uidSensorE + "2",
        }
    }
    


    constructor(){
        this.sensores.set("Sensor A", this.linksA);
        this.sensores.set("Sensor B", this.linksB);
        this.sensores.set("Sensor C", this.linksC);
        this.sensores.set("Sensor D", this.linksD);
        this.sensores.set("Sensor E", this.linksE);
    }

    public getSensorNames(){
        return this.sensores.keys()
    }

    public getUrls(sensor: string,key: string){
        return this.sensores.get(sensor)[key]
    }

    public getEmbeddedUrl(sensor: string,key: string, atribute: string){
        return this.sensores.get(sensor)[key][atribute]
    }
    
    public getSensor(){
        return this.sensor;
    }

    public setSensor(sensor:string){
        this.sensor = sensor
    }

    
}