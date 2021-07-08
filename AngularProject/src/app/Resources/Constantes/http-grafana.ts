import { CookieService } from './../../Services/Storage/cookie.service';
import { stringify } from "@angular/compiler/src/util";

export type urlGrafana = {
    normal: string;
    render: string;

    [key: string]: string;
}

export type valor = {
    inicio: number;
    historico?: number;

    [key: string]: number | undefined;
}

export class HttpGrafana{

    static url = 'http://localhost:3000/'
    static complement = "d-solo/2_cZSKuMz/plantilla?orgId=1&refresh=5s&panelId="

    private static urlGrafana: urlGrafana = {
        normal: HttpGrafana.url + HttpGrafana.complement,
        render: HttpGrafana.url + 'render/' + HttpGrafana.complement
    }

    private static var_bucket: string = "&var-buckets="
    private static var_cultivo: string = "&var-cultivos="
    private static var_finca: string = "&var-fincas="
    private static var_medidas: string = "&var-medidas=";
    private static var_finca2: string = "&var-fincas2=";

    private static cookie: CookieService = new CookieService();


    private static tiempos: Map<string,string> = new Map([
        ["Última hora","&from=now-1h&to=now"],
        ["Últimas 3 horas","&from=now-3h&to=now"],
        ["Últimas 6 horas","&from=now-6h&to=now"],
        ["Últimas 12 horas","&from=now-12h&to=now"],
        ["Este día","&from=now%2Fd&to=now"],
        ["Ayer","&from=now-1d%2Fd&to=now-1d%2Fd"],
        ["Hace dos días","&from=now-2d%2Fd&to=now-2d%2Fd"],
        ["Esta semana","&from=now%2Fw&to=now"],
        ["Semana Pasada","&from=now-1w%2Fw&to=now-1w%2Fw"],
        ["Este mes","&from=now%2FM&to=now"],
        ["Mes pasado","&from=now-1M%2FM&to=now-1M%2FM"],
        ["Este año","&from=now%2Fy&to=now"],
        ["El año pasado","&from=now-1y%2Fy&to=now-1y%2Fy"],
        ["Los últimos 5 años","&from=now-5y&to=now"]
    ]);

    private static panelID: Map<string,valor> = new Map([
        ["temperatura",{
            inicio : 8,
            historico: 14,

        }],
        ["precipitacion",{
            inicio: 10,
            historico: 16,
        }],
        ["humedad",{
            inicio: 12,
            historico: 18,

        }],
        ["uv",{
            inicio: 22,
            historico: 24,

        }],
        ["comparacion",{
            inicio: 28,
        }],
        ["mapa",{
            inicio: 30,
        }]
    ]);

    public static getTiempos(){
        return HttpGrafana.tiempos.keys()
    }

    public static getEmbeddedUrl(
        mapa: Map<string,string>
        )
    {
        let panel: string = mapa.get("panel") as string
        let temp: valor = HttpGrafana.panelID.get(panel) as valor
        if (temp !== undefined) {
            let bucket = HttpGrafana.cookie.getItem("Bucket")
            let modo: string = mapa.get("modo") as string

            let subpanel: string = mapa.get("subpanel") as string
            let cultivo: string = mapa.get("cultivo") as string
            let finca: string = mapa.get("finca") as string


            return HttpGrafana.urlGrafana[modo] + temp[subpanel]
                + HttpGrafana.var_bucket + bucket + HttpGrafana.var_cultivo + cultivo
                + HttpGrafana.var_finca + finca + HttpGrafana.tiempos.get("Última hora")
        }
        return ""
        
    }
    
    public static getEmbeddedUrlForMapa(
        mapa: Map<string,string>
        )
    {
        let panel: string = mapa.get("panel") as string
        let temp: valor = HttpGrafana.panelID.get(panel) as valor
        if (temp !== undefined) {
            let bucket = HttpGrafana.cookie.getItem("Bucket")
            let modo: string = mapa.get("modo") as string

            let subpanel: string = mapa.get("subpanel") as string
            let cultivo: string = mapa.get("cultivo") as string
            let finca: string = mapa.get("finca") as string
		let medida: string = mapa.get("medida") as string

            return HttpGrafana.urlGrafana[modo] + temp[subpanel]
                + HttpGrafana.var_bucket + bucket + HttpGrafana.var_cultivo + cultivo
                + HttpGrafana.var_finca + finca + HttpGrafana.var_medidas + medida 
                + HttpGrafana.tiempos.get("Última hora")
        }
        return ""
        
    }

    public static getEmbeddedUrlByTime(
        mapa: Map<string,string>
        )
    {
        let panel: string = mapa.get("panel") as string
        let temp: valor = HttpGrafana.panelID.get(panel) as valor
        if (temp !== undefined) {
            let bucket = HttpGrafana.cookie.getItem("Bucket")
            let modo: string = mapa.get("modo") as string

            let subpanel: string = mapa.get("subpanel") as string
            let cultivo: string = mapa.get("cultivo") as string
            let finca: string = mapa.get("finca") as string
            let tiempo: string = mapa.get("tiempo") as string

            let time: string | undefined = HttpGrafana.tiempos.get(tiempo)

            if(time === undefined)
                time = "&from=now-1h&to=now"

            return HttpGrafana.urlGrafana[modo] + temp[subpanel]
                + HttpGrafana.var_bucket + bucket + HttpGrafana.var_cultivo + cultivo
                + HttpGrafana.var_finca + finca + time
        }

        return ""
    }

    public static getEmbeddedUrlByTimeComparacion(
        mapa: Map<string,string>
        )
    {
        let panel: string = mapa.get("panel") as string
        let temp: valor = HttpGrafana.panelID.get(panel) as valor
        if (temp !== undefined) {
            let bucket = HttpGrafana.cookie.getItem("Bucket")
            let modo: string = mapa.get("modo") as string

            let subpanel: string = mapa.get("subpanel") as string
            let cultivo: string = mapa.get("cultivo") as string
            let finca: string = mapa.get("finca") as string
            let tiempo: string = mapa.get("tiempo") as string
            let medida: string = mapa.get("medida") as string
            let finca2: string = mapa.get("finca2") as string

            let time: string | undefined = HttpGrafana.tiempos.get(tiempo)

            if(time === undefined)
                time = "&from=now-1h&to=now"

            return HttpGrafana.urlGrafana[modo] + temp[subpanel]
                + HttpGrafana.var_bucket + bucket + HttpGrafana.var_cultivo + cultivo
                + HttpGrafana.var_finca + finca + time
                + HttpGrafana.var_medidas + medida + HttpGrafana.var_finca2 + finca2
        }

        return ""
    }


}
