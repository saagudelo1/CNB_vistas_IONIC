import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

/*
  Generated class for the OperatorServisesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OperatorServisesProvider {

  constructor(public http: Http) {
    console.log('Hello OperatorServisesProvider Provider');
  }


  //Url de la api a la cual se le van a hacer las peticiones
  apiUrlDeposito = 'https://rj0qyix703.execute-api.us-east-2.amazonaws.com/Dev/deposit';


  
  /**
   * Método para realizar la petición post al ws de crear depósito
   * @param data 
   */
  newDeposit(data) {
    return new Promise((resolve, reject)=> {
      this.http.post(this.apiUrlDeposito, JSON.stringify(data))
      .subscribe(
          (data) =>{
            console.log("respuesta en post",data);
            console.log("estatus :", data.status)
            let response:any = data.json();     
            resolve(response);
          }, (error)=>{
            let errorMessage:any = error.json(); 
            reject(errorMessage);
          }
        );
    });
  }

}
