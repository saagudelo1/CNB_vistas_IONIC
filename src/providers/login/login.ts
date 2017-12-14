import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http/src/params';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
  }

  private urlServer: String = "http://192.168.3.187:5000";

  PostToServer(ruta, body, parametros: HttpParams) {
    return this.http
      .post(this.urlServer + ruta, 
        body, {params: parametros});
  }

}
