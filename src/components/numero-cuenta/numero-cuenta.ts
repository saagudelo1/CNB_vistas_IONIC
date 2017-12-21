import { Component } from '@angular/core';
import { CabeceraDepositoComponent } from '../cabecera-deposito/cabecera-deposito'
import { VerificarProvider } from '../../providers/verificar/verificar';
import { OperatorServicesProvider } from '../../providers/operator-services/operator-services';

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
  //Variables para guardar los datos del depósito realizado
  datosDeposito = {
    numeroTransaccion: '',
    fechaHora: '',
    nombreCNB: '',
    numeroCNB: '',
    concepto: '',
    numeroCuenta: '',
    nombreCliente: '',
    montoDepositado: '',
    montoEntregado: '',
    cambio: ''
  }

  
  constructor(private _verificar: VerificarProvider, private operatorServices: OperatorServicesProvider) {
    console.log('Hello NumeroCuentaComponent Component');
    this.text = 'Hello World';
  }
    

  /**
   * Mètodo para consultar cuenta
   */
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


  /**
   * Método para realizar depósito. Conume el microservicio de depósito
   */
  realizarDeposito(){
    //Variable json para enviar al microservicio
    let bodyDeosito = { wsLnkBusCnbCajero: '081402',
                        wsLnkBusCnbCuenta: this.NumCuenta,
                        wsLnkBusCnbMonto: this.Monto,
                        wsLnkBusCnbSucursal: '00814'
                      }
    let cambio; //variable para hacer el cálculo del cambio

   
    //Llamado al método creado en el provider para consumir el microservicio
    this.operatorServices.newDeposit(bodyDeosito)
        .subscribe(response => {
          // console.log("El mensaje es: ", response.body["wsLineasMensajes"])
          if (response.body["wsLineasMensajes"] == '03') { //Se verifica la respuesta del microservicio
            alert("Depósito realizado correctamente "+response.body["wsLineasMensajes"]);
            cambio = this.Monto - this.Entregado; //se camcula el cambio
            //Llenamos el json con los datos del depósito
            let ObjetoDate = new Date();
            let fecha = (ObjetoDate.getDate()) + "/" + (ObjetoDate.getMonth() + 1) + "/" + (ObjetoDate.getFullYear())  + " " + (ObjetoDate.toLocaleTimeString())   
            this.datosDeposito.numeroTransaccion = response.body["wsConsecutivoTx"];
            this.datosDeposito.fechaHora = fecha;
            this.datosDeposito.nombreCNB = 'CNB prueba';
            this.datosDeposito.numeroCNB = '00814';
            this.datosDeposito.concepto = 'Depósito en efectivo';
            this.datosDeposito.numeroCuenta =  (this.NumCuenta).toString();
            this.datosDeposito.nombreCliente = this.labelNombre;
            this.datosDeposito.montoDepositado = this.Monto.toString();
            this.datosDeposito.montoEntregado = this.Entregado.toString();
            this.datosDeposito.cambio = cambio;
            
            let jDeposito:string = JSON.stringify(this.datosDeposito);
            // console.log("Los datos del depósito son: ", jDeposito);
            localStorage.setItem("Deposito",jDeposito);

            // let Deposito:JSON = JSON.parse(localStorage.getItem("Deposito"));
            // console.log("Los datos del depósito son: ", Deposito);
            
          }
          else{
            //Para mostrar los errores
            alert("Error al realizar el depósito "+response.body["wsLineasMensajes"]);
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
          this.errorCuenta = "";
          this.validar[0] = false;        
        } 
      }   
    } else {
      this.clase_cuenta = "";
      this.errorCuenta = "";
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
          this.errorMonto = "";
          this.validar[0] = false;        
        } 
      }   
    } else {
      this.clase_monto = "";
      this.errorMonto = "";
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
        this.errorMontoEntregado = "";
        this.validar[0] = false;        
      } 
    }   
  } else {
    this.clase_monto = "";
    this.errorMontoEntregado = "";
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
