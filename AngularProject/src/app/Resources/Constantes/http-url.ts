import { HttpHeaders } from '@angular/common/http';


export class HttpUrl {

    static url = 'http://localhost:3000/'
    static complement = "d-solo/2_cZSKuMz/plantilla?orgId=1&refresh=5s&panelId="

    static urlGrafana = ''
    static urlGrafanaRender = ''
    static urlMiddleware = 'http://localhost:4000/'

    static url_login = HttpUrl.urlMiddleware + 'users/login'
    static url_grafana_config = HttpUrl.urlMiddleware + 'config/configuracion'
    static url_cultivos = HttpUrl.urlMiddleware + 'external/cultivos'
    static url_fincas = HttpUrl.urlMiddleware + 'external/fincas'
    static url_images = HttpUrl.urlMiddleware + 'external/images'

    static httpOptionsRest = {
        headers: new HttpHeaders({
            "content-type": "application/json",
            "x-apikey": "5f622ccc5313511c55fc974d",
            "cache-control": "no-cache"
        })
    };

    static httpOptionsMisc = {
        headers: new HttpHeaders({
            "content-type": "application/json"
            /*
            "x-apikey": "5f622ccc5313511c55fc974d",
            "cache-control": "no-cache"
            */
        })
    };

    public static setUrl_Grafana(url: string, render:string, complement: string){
        HttpUrl.urlGrafana = url + complement
        HttpUrl.urlGrafanaRender = url + render + complement
    }


}
