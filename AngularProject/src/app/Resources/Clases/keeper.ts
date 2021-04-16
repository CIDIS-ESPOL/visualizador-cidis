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

    private sensores = [];

    private cultivos = []
    private fincas = []

    private links = new Map()

    constructor(){
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
        + this.var_finca + finca
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

    public setVarBucket(var_bucket: any){
        this.var_bucket = var_bucket
    }

    public setVarCultivo(var_cultivo: any){
        this.var_cultivo = var_cultivo
    }

    public setVarFinca(var_finca: any){
        this.var_finca = var_finca
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
    }

    public print_itself(){
        console.log(this)
    }

    
    
}
