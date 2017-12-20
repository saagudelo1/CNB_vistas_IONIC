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
  
    private urlServer: String = "https://4jctek2o4d.execute-api.us-east-2.amazonaws.com";
  
    PostToServer(ruta, body, parametros: HttpParams) {
      return this.http
        .post(this.urlServer + ruta, 
          body, {params: parametros, observe: "response"});
    }
  
  }
<<<<<<< HEAD

  private urlServer: String = "http://localhost:5000";

  PostToServer(ruta, body, parametros: HttpParams) {
    return this.http
      .post(this.urlServer + ruta, 
        body, {params: parametros});
  }

}
=======
  
>>>>>>> c5296e6193de53d488006be53c8b7a8fcd4f66b5
