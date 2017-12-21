import { Component } from '@angular/core';

/**
 * Generated class for the CabeceraDepositoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cabecera-deposito',
  templateUrl: 'cabecera-deposito.html'
})
export class CabeceraDepositoComponent {

  text: string;
  public mostrar:boolean= false;
  
  constructor() {

  }

  mosBarra(val:boolean){    
    this.mostrar=val;  
    document.getElementById("botonopera").click();        
}
}
