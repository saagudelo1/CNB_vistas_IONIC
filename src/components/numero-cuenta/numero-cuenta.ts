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


  text: string;
  MostrarInfo: boolean = false;

  
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
          this.MostrarInfo = true;
        } else {
          (response["error"])
          this.MostrarInfo = false;
          this.error = true;

        }



      });
  }
    
  

    
}
