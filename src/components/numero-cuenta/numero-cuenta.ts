import { Component } from '@angular/core';
import { CabeceraDepositoComponent } from '../cabecera-deposito/cabecera-deposito'
import { VerificarProvider } from '../../providers/verificar/verificar';

/**
 * Generated class for the NumeroCuentaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'numero-cuenta',
  templateUrl: 'numero-cuenta.html'
})
export class NumeroCuentaComponent {

  error: boolean = false;
  NumCuenta : number;
  Monto: number;
  Entregado: number;
  validar=[false,false,false];
  errorCuenta; errorMonto; errorMontoEntregado;
  clase_cuenta; clase_monto; clase_entregado;
  text: string;
  MostrarInfo: boolean = false;
  MostrarFormu :boolean =true;

  labelNombre; labelNumCuenta; labelMontoDepositar; labelMontoEntregado;
  
  constructor(private _verificar: VerificarProvider) {
    console.log('Hello NumeroCuentaComponent Component');
    this.text = 'Hello World';
  }
    

  Consultar() {
    let ruta = "https://8j24b5non3.execute-api.us-east-2.amazonaws.com/dev/cuenta";
    let body = {};

    this._verificar.PostToMock(body)
      .subscribe(response => {
        
        

        if (response["NumeroCuenta"] == this.NumCuenta) {
          console.log(NumeroCuentaComponent);
          this.labelNombre= response["NombreTitular"];
          this.labelNumCuenta= response["NumeroCuenta"];
          this.labelMontoDepositar= this.Monto;
          this.labelMontoEntregado= this.Entregado;
          this.MostrarInfo = true;
          this.MostrarFormu=false;
        } else {
          (response["error"])
          this.MostrarInfo = false;
          this.MostrarFormu=true;
          alert("El número de cuenta no existe");
          this.error = true;

        }
      });
  }

  validarCuenta(input){
    if (!isNaN(input.value) ) {
      if (input.value == undefined || input.value == "") {
        this.clase_cuenta = "has-error";
        this.errorCuenta = "No se permiten el campo vacio.";
        this.validar[0] = false;
      } else {
        if (input.value.length == 15) {     
          
          this.clase_cuenta = "";
          this.errorCuenta = "";
          this.validar[0] = true;
        } else {
          this.clase_cuenta = "";
          this.errorCuenta = "El numero de cuenta no es valido.";
          this.validar[0] = false;        
        } 
      }   
    } else {
      this.clase_cuenta = "";
      this.errorCuenta = "Numero de cuenta no es valido.";
      this.validar[0] = false;  
      this.NumCuenta =  null; 
    }
 
   } 
  
   validarMonto(input){
    if (!isNaN(input.value) ) {
      if (input.value == undefined || input.value == "") {
        this.clase_monto = "";
        this.errorMonto = "No se permiten el campo vacio.";
        this.validar[0] = false;
      } else {
        if (input.value.length == 6) {     
          
          this.clase_monto = "";
          this.errorMonto = "";
          this.validar[0] = true;
        } else {
          this.clase_monto = "";
          this.errorMonto = "El numero de cuenta debe tener 13 numeros.";
          this.validar[0] = false;        
        } 
      }   
    } else {
      this.clase_monto = "";
      this.errorMonto = "Numero de cuenta no es valido.";
      this.validar[0] = false;  
      this.Monto=  null; 
    } 
}

validarEntregado(input){
  if (!isNaN(input.value) ) {
    if (input.value == undefined || input.value == "") {
      this.clase_entregado = "";
      this.errorMontoEntregado = "No se permiten el campo vacio.";
      this.validar[0] = false;
    } else {
      if (input.value.length == 6) {     
        
        this.clase_entregado = "";
        this.errorMontoEntregado = "";
        this.validar[0] = true;
      } else {
        this.clase_entregado = "";
        this.errorMontoEntregado = "El numero de cuenta debe tener 13 numeros.";
        this.validar[0] = false;        
      } 
    }   
  } else {
    this.clase_monto = "";
    this.errorMontoEntregado = "Numero de cuenta no es valido.";
    this.validar[0] = false;  
    this.Entregado =  null; 
  } 
}

//Función para corregir
corregir(){
this.MostrarFormu=true;
this.MostrarInfo=false;

}








}
