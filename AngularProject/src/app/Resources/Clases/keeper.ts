import { HttpRequestService } from 'src/app/Services/HTTP/http-request.service';
import { HttpUrl } from '../Constantes/http-url'
import { UidGrafana } from '../Constantes/uid-grafana'


export class Keeper{

    private username: string = "";

    private sensor: string = "";

    private bucket: string = "";
    private cultivo: string = "";
    private finca: string = "";

    private var_bucket: string = "";
    private var_cultivo: string = "";
    private var_finca: string = "";
    private var_medidas: string = "";
    private var_finca2: string = "";

    private sensores = [];

    private cultivos = []
    private fincas = []

    private tiempos = new Map()

    private links = new Map()

    constructor(){
        this.tiempos.set("Últimos 5 minutos","&from=now-5m&to=now")
        this.tiempos.set("Últimos 15 minutos","&from=now-15m&to=now")
        this.tiempos.set("Últimos 30 minutos","&from=now-30m&to=now")
        this.tiempos.set("Última hora","&from=now-1h&to=now")
        this.tiempos.set("Últimas 3 horas","&from=now-3h&to=now")
        this.tiempos.set("Últimas 6 horas","&from=now-6h&to=now")
        this.tiempos.set("Últimas 12 horas","&from=now-12h&to=now")
        this.tiempos.set("Este día","&from=now%2Fd&to=now")
        this.tiempos.set("Ayer","&from=now-1d%2Fd&to=now-1d%2Fd")
        this.tiempos.set("Hace dos días","&from=now-2d%2Fd&to=now-2d%2Fd")
        this.tiempos.set("Esta semana","&from=now%2Fw&to=now")
        this.tiempos.set("Semana Pasada","&from=now-1w%2Fw&to=now-1w%2Fw")
        this.tiempos.set("Este mes","&from=now%2FM&to=now")
        this.tiempos.set("Mes pasado","&from=now-1M%2FM&to=now-1M%2FM")
        this.tiempos.set("Este año","&from=now%2Fy&to=now")
        this.tiempos.set("El año pasado","&from=now-1y%2Fy&to=now-1y%2Fy")
        this.tiempos.set("Los últimos 5 años","&from=now-5y&to=now")
    }

    public getTiempos(){
        return this.tiempos.keys()
    }

    public getBucket(){
        return this.bucket
    }

    public getUsername(){
        return this.username
    }

    public getCultivo(){
        return this.cultivo
    }

    public getCultivos(){
        return this.cultivos
    }

    public getFinca(){
        return this.finca
    }

    public getFincas(){
        return this.fincas
    }

    public getSensorNames(){
        return this.sensores
    }
    
    public getSensor(){
        return this.sensor;
    }

    public getEmbeddedUrl(key: string, atribute: string, finca:string){
        //return this.links.get(key)[atribute] + sensor
        return HttpUrl.urlGrafana + this.links.get(key)[atribute] 
        + this.var_bucket + this.bucket + this.var_cultivo + this.cultivo 
        + this.var_finca + finca + this.tiempos.get("Últimos 5 minutos")
    }

    public getEmbeddedUrlByTime(key: string, atribute: string, tiempo:string){
        //return this.links.get(key)[atribute] + sensor
        return HttpUrl.urlGrafana + this.links.get(key)[atribute] 
        + this.var_bucket + this.bucket + this.var_cultivo + this.cultivo 
        + this.var_finca + this.finca + this.tiempos.get(tiempo)
    }

    public getEmbeddedUrlByTimeComparacion(medida: string, key: string,tiempo:string, finca2: string){
        //return this.links.get(key)[atribute] + sensor
        return HttpUrl.urlGrafana + this.links.get(key) 
        + this.var_bucket + this.bucket + this.var_cultivo + this.cultivo 
        + this.var_finca + this.finca + this.tiempos.get(tiempo)
        + this.var_medidas + medida + this.var_finca2 + finca2
    }

    public setUsername(username: string){
        this.username = username
    }

    public setSensor(sensor:string){
        this.sensor = sensor
    }

    public setBucket(bucket: string){
        this.bucket = bucket
    }

    public setCultivo(cultivo: string){
        this.cultivo = cultivo
    }

    public setCultivos(cultivos:any){
        this.cultivos = cultivos
    }

    public setFinca(finca: string){
        this.finca = finca
    }

    public setFincas(fincas: any){
        this.fincas = fincas
    }

    public setVarMedida(var_medidas: any){
        this.var_medidas = var_medidas
    }

    public setVarBucket(var_bucket: any){
        this.var_bucket = var_bucket
    }

    public setVarCultivo(var_cultivo: any){
        this.var_cultivo = var_cultivo
    }

    public setVarFinca(var_finca: any){
        this.var_finca = var_finca
    }

    public setVarFinca2(var_finca2: any){
        this.var_finca2 = var_finca2
    }

    public setSensores(sensores: any){
        this.sensores = sensores
    }

    public init_links(lista: Array<number>){
        this.links.set("temperatura",{
            inicio : lista[0],
            historico: lista[1],

        })

        this.links.set("presion",{
            inicio: lista[2],
            historico: lista[3],
        })

        this.links.set("humedad",{
            inicio: lista[4],
            historico: lista[5],

        })

        this.links.set("uv",{
            inicio: lista[6],
            historico: lista[7],

        })

        this.links.set("comparacion",lista[8])
    }

    public print_itself(){
        console.log(this)
    }

    
    
}
