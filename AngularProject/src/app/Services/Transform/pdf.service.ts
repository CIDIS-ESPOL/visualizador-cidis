import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
  ) { }

  createPDF(filename: string,listaTexto: Array<string>, listaUrl: Array<string>) {

    let token = this.cookie.getItem('Token')

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      }),
      responseType: 'blob'
    };

    let data = {
      filename: filename,
      textos: listaTexto,
      urls: listaUrl
    }

    this.http.post(HttpUrl.url_images,data,httpOptionsRest)
    .then((result:any) => {
      console.log(result)
      this.downLoadFile(result,"application/pdf",filename)

    })
    .catch((error:any) =>{
      console.log(error)
      alert('Hubo un error al tratar de crear el pdf')
    })
    
  }

  /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
private downLoadFile(data: any, type: string, filename: string) {
    let blob = new Blob([data], { type: type});
    let name = filename + '.pdf'
    fileSaver.saveAs(blob, name);
    /*
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
    */
  }
}
