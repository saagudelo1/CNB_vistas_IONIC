import { Component } from '@angular/core';
import{Deposito} from './Model/Deposito';

@Component({
  selector: 'imprimir',
  templateUrl: 'imprimir.html'
})
export class ImprimirComponent {
  public deposito:Deposito;

 

  constructor() {

    this.deposito = new Deposito( "Deposito", "Jairo Meneses", "Ahorros", 123456789, 10000, 123456, 123);
    
  }

}
