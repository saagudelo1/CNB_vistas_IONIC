import { Component } from '@angular/core';
import { CabeceraDepositoComponent } from '../cabecera-deposito/cabecera-deposito'
import { VerificarProvider } from '../../providers/verificar/verificar';
import { OperatorServicesProvider } from '../../providers/operator-services/operator-services';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
//import { Directive, ElementRef } from '@angular/core';
//import { NgModel } from '@angular/forms';


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

  private _restStage: boolean = false;

  error: boolean = false;
  NumCuenta : number;
  Monto: string;
  MontoSinPuntos;
  MontoESinPuntos;
  Entregado: string;
  validar=[false,false,false];
  errorCuenta; errorMonto; errorMontoEntregado;
  clase_cuenta; clase_monto; clase_entregado;
  MostrarInfo: boolean = false;
  MostrarFormu :boolean =true;
  MostrarFormu2 :boolean = false;
  MostrarBoton :boolean = true;
  labelNombre; labelNumCuenta; labelMontoDepositar; labelMontoEntregado; formattedAmount;
  amount; pesos = "$";
  value;

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

  
  constructor(
    private _verificar: VerificarProvider, 
    private operatorServices: OperatorServicesProvider, 
    private route: ActivatedRoute,
    private router: Router) { }

  
  /**
   * Método para consultar cuenta
   */
  Consultar() {
    let ruta = "https://8j24b5non3.execute-api.us-east-2.amazonaws.com/dev/cuenta";
    let body = {};

    this._verificar.PostToMock(body)
      .subscribe(response => {
        if (response["NumeroCuenta"] == this.NumCuenta) {
         // console.log(NumeroCuentaComponent);
          this.labelNombre= response["NombreTitular"];
          this.labelNumCuenta= response["NumeroCuenta"];
          this.MostrarFormu2 = true;
          this.MostrarFormu=true;
          this.MostrarInfo=false;
          this.MostrarBoton=false;
        } else {
          (response["error"])
          this.MostrarFormu2 = false;
          this.MostrarInfo=false;
          this.MostrarFormu=true;
          this.MostrarBoton = true;
          alert("El número de cuenta no existe");
          this.error = true;

        }
      });
  }

  /**
   * Función para mostrar la información al confirmar los datos
   */
  confirmarCuenta(){
    this.MostrarFormu2 = false;
    this.MostrarInfo = true;
    this.MostrarFormu= false;
    this.labelMontoEntregado= this.MontoESinPuntos;
    this.labelMontoDepositar= this.MontoSinPuntos;
  }

  /**
   * Función para regresar al
   */
  // corregirCuenta(){
  //   this.MostrarFormu = true;
  //   this.MostrarFormu2 = false;
  //   this.MostrarInfo = false;
  // }

  /**
   * Regresa al menú operador
   */
  cancelarTransaccion(){
    this.router.navigate(['/Operario']);
  }


  /**
   * Método para realizar depósito. Conume el microservicio de depósito
   */
  realizarDeposito(){
    //Variable json para enviar al microservicio
    let bodyDeposito = { wsLnkBusCnbCajero: '081402',
                        wsLnkBusCnbCuenta: this.NumCuenta,
                        wsLnkBusCnbMonto: this.MontoSinPuntos,
                        wsLnkBusCnbSucursal: '00814'
                      }
    let cambio; //variable para hacer el cálculo del cambio
    //console.log("el cuerpo del depósito es: ", bodyDeposito)
    //Llamado al método creado en el provider para consumir el microservicio
    this.operatorServices.newDeposit(bodyDeposito)
        .subscribe(response => {
          //console.log("El mensaje es: ", response.body["wsLineasMensajes"])
          if (response.body["wsLineasMensajes"] == '03') { //Se verifica la respuesta del microservicio
            // alert("Depósito realizado correctamente "+response.body["wsLineasMensajes"]);
            //let cambio :string;
            cambio = (this.MontoESinPuntos - this.MontoSinPuntos).toString(); //se calcula el cambio
            cambio = this.ponerPuntos(cambio);

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
            //console.log("Los datos del depósito son: ", jDeposito);
            localStorage.setItem("Deposito",jDeposito);
            this.router.navigate(['/imprimir']);           
          }
          else{
            //Para mostrar los errores
            alert("Error al realizar el depósito "+response.body["wsLineasMensajes"]);
          }
        });
  }

  /**
   * Validación de la cuenta ingresada
   */
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
  
//    validarMonto(input){
//     if (!isNaN(input.value) ) {
//       if (input.value == undefined || input.value == "") {
//         this.clase_monto = "";
//         this.errorMonto = "No se permiten el campo vacio.";
//         this.validar[0] = false;
//       } else {
//         if (input.value.length == 6) {     
          
//           this.clase_monto = "";
//           this.errorMonto = "";
//           this.validar[0] = true;
//         } else {
//           this.clase_monto = "";
//           this.errorMonto = "";
//           this.validar[0] = false;        
//         } 
//       }   
//     } else {
//       this.clase_monto = "";
//       this.errorMonto = "";
//       this.validar[0] = false;  
//       this.Monto=  null; 
//     } 
// }

// validarEntregado(input){
//   if (!isNaN(input.value) ) {
//     if (input.value == undefined || input.value == "") {
//       this.clase_entregado = "";
//       this.errorMontoEntregado = "No se permiten el campo vacio.";
//       this.validar[0] = false;
//     } else {
//       if (input.value.length == 6) {     
        
//         this.clase_entregado = "";
//         this.errorMontoEntregado = "";
//         this.validar[0] = true;
//       } else {
//         this.clase_entregado = "";
//         this.errorMontoEntregado = "";
//         this.validar[0] = false;        
//       } 
//     }   
//   } else {
//     this.clase_monto = "";
//     this.errorMontoEntregado = "";
//     this.validar[0] = false;  
//     this.Entregado =  null; 
//   } 
// }

//Función para mostrar el formularo de nuevo y corregir los datos
corregir(){
this.MostrarFormu=true;
this.MostrarInfo=false;
this.MostrarFormu2=true;
}

/**
 * Validación del monto entregado por el cliente
 */
ValidarMontoEntregado() {    
  this.Entregado = this.quitarPuntos(this.Entregado);
  console.log("EL monto entregado sin puntos ",this.Entregado)
  this.datosDeposito.montoEntregado = this.Entregado;//Guardar en el json
  this.MontoESinPuntos = this.Entregado;

  if (this.validarSiNumero(this.Entregado)) {
    let numeroAntes= "";
    
    for(let num = 0; num < (this.Entregado.length -1); num++){
      numeroAntes += this.Entregado[num];
    }
    // alert("El valor  no es un número, antes: "+numeroAntes);
    this.Entregado = numeroAntes;
  }
  //validar BD
  this.Entregado = this.ponerPuntos(this.Entregado);
}


/**
 * Validación del monto a depositar
 */
ValidarMontoDeposito() {    
  this.Monto = this.quitarPuntos(this.Monto);
  console.log("EL monto sin puntos ",this.Monto)
  this.MontoSinPuntos = this.Monto;
  console.log("Datos de deposito", this.datosDeposito.montoDepositado);
  if (this.validarSiNumero(this.Monto)) {
    let numeroAntes= "";
    
    for(let num = 0; num < (this.Monto.length -1); num++){
      numeroAntes += this.Monto[num];
    }
    // alert("El valor  no es un número, antes: "+numeroAntes);
    this.Monto = numeroAntes;
  }
  //validar BD
  this.Monto = this.ponerPuntos(this.Monto);
}

/**
 * Función para poner puntos
 * @param valor 
 */
ponerPuntos(valor:string): string{
  let con = 0 ;
  let numFinal:string="";
  let ban:boolean = false;
 
  if (valor.length<=2) {
    return valor;
  } else {   
    //voltea el string 
    valor = valor.split("").reverse().join("");  
    //recorro el string  
    for(let num of valor){
      if (ban) {
        if(con==4){
          if (num==",") {
            con -= 1;
          }else{
            numFinal +=",";
            con = 1;
          }          
        }          
      } else {
        if(con==2){
          if (num==".") {
            con -= 1;
          }else{
            numFinal +=".";
            con = 1;
            ban = true;
          }          
        }
      }
      con += 1;
      numFinal +=num;        
    }      
  }
  numFinal =numFinal.split("").reverse().join("");
  return numFinal;
}

/**
 * Función para quitar los puntos
 * @param valor 
 */
quitarPuntos(valor:string): string{    
  let numFinal:string = "";
  for(let num of valor){           
      if (!(num == "." || num == ",")) {        
        numFinal += num;         
      }        
  }        
  return numFinal;
}

/**Función para saber si es número o no
 * 
 * @param numero 
 */
validarSiNumero(numero){
  if (!/^([0-9])*$/.test(numero)){
    return true;
  }
  return false;
    // alert("El valor " + numero + " no es un número");
}



}
