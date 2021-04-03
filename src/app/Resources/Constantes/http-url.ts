import { HttpHeaders } from '@angular/common/http';


export class HttpUrl {
    static urlGrafana = 'http://localhost:3000/d-solo/'

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
}