import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the VerificarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VerificarProvider {

  constructor(public http: HttpClient) {
  }
  private apiVerificar: string = "https://8j24b5non3.execute-api.us-east-2.amazonaws.com/dev/cuenta";

  
  PostToMock(body:any) {
    return this.http
      .post(this.apiVerificar, body)
  }

}
