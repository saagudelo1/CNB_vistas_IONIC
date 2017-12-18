import { Component } from '@angular/core';
import { CabeceraDepositoComponent } from '../cabecera-deposito/cabecera-deposito'

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

  text: string;
  MostrarInfo: boolean = false;
  constructor() {
    console.log('Hello NumeroCuentaComponent Component');
    this.text = 'Hello World';
  }
  Consultar() {
    if (this.MostrarInfo) {
      this.MostrarInfo = false;
    }
    else {
      this.MostrarInfo = true;
    }
  }
}
