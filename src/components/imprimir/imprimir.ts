import { Component } from '@angular/core';
import{Deposito} from './Model/Deposito';

@Component({
  selector: 'imprimir',
  templateUrl: 'imprimir.html'
})
export class ImprimirComponent {
  public deposito:Deposito;
  public col1 = ["Tipo de Operacion:"," Nombre:","Tipo de cuenta:","Numero de cuenta:","Monto:","Numero de comprobante:","Numero de Transaccion:"];
  public col2;

 

  constructor() {

    this.deposito = new Deposito( "Deposito", "Jairo Meneses", "Ahorros", 123456789, 10000, 123456, 123);
    this.col2 = ["Deposito", "Jairo Meneses", "Ahorros", 123456789, 10000, 123456, 123];
      
    
  }
}
