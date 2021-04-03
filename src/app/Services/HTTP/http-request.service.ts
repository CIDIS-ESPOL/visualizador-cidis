import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(public http: HttpClient) { }

  public get(url : string, httpOptions: any){
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(url,httpOptions)
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  public post(url : string , data : any, httpOptions: any){
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(url,data,httpOptions)
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  public put(url : string , data : any, httpOptions: any){
    const promise = new Promise((resolve, reject) => {
      this.http
        .put(url,data,httpOptions)
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  
  public delete(url : string,data:any, httpOptions: any){
    const promise = new Promise((resolve, reject) => {
      this.http
        .delete(url,httpOptions)
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }
}
