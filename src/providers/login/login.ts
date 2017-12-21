import { HttpClient,HttpHeaders } from '@angular/common/http';
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

  private urlServer: String = "https://0v7brt9d84.execute-api.us-west-2.amazonaws.com";

  PostToServer(ruta, body, parametros: HttpParams) {
   
    
    return this.http
      .post(this.urlServer + ruta, 
        body, {params: parametros, observe: "response"});
  }

}
