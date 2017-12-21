import { Component } from "@angular/core";
import { DateTime } from "ionic-angular/components/datetime/datetime";

@Component({
  selector: "imprimir",
  templateUrl: "imprimir.html"
})
export class ImprimirComponent {
  
  public col1 = ["Número de Transacción:"," Fécha y Hora:","Nombre CNB:","Número CNB:","Concepto:","Número de Cuenta:",
"Nombre del Cliente:","Monto Depositado:","Monto Entregado","Cambio"];
  public col2; 

  
  constructor() {

    let Deposito:JSON = JSON.parse(localStorage.getItem("Deposito"));
    console.log("Los datos del depósito son: ", Deposito);
    
    this.col2 = ["1234567890", (new Date().getDate()) + "/" +(new Date().getMonth()+1) + "/" +(new Date().getFullYear()) +" "+ new Date().toLocaleTimeString(), "OLA 1","Transferencia" , "$9,000.00", "$9,000.00","$10,000.00","$1,000.00"  ];  
       

  }
  
  public imprSelec (DatosImp)
  {var ficha=document.getElementById(DatosImp);
    var ventimp=window.open(' ','popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.print();
    ventimp.close();
  }
  
  
}

