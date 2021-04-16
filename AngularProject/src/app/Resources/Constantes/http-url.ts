import { HttpHeaders } from '@angular/common/http';


export class HttpUrl {
    static urlGrafana = 'http://localhost:8086/d/'
    static urlMiddleware = 'http://localhost:4000/'

    static url_login = HttpUrl.urlMiddleware + 'users/login'
    static url_grafana_config = HttpUrl.urlMiddleware + 'config/configuracion'
    static url_cultivos_1 = HttpUrl.urlMiddleware + 'external/cultivos'
    static url_cultivos_2 = HttpUrl.urlMiddleware + 'external/cultivos'

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

    public static setUrl_Grafana(url: string){
        HttpUrl.urlGrafana = url
    }
}
