import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the OperatorServisesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OperatorServicesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OperatorServicesProvider Provider');
  }


  //Url de la api a la cual se le van a hacer las peticiones
  apiUrlDeposito = 'https://rj0qyix703.execute-api.us-east-2.amazonaws.com/Dev/deposit';



  /**
   * Método para realizar la petición post al ws de crear depósito
   * @param data 
   */
  newDeposit(data) {
    return this.http.post(this.apiUrlDeposito, data, { observe: 'response' });
  }

}
