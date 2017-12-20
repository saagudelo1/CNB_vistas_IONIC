import { Component } from "@angular/core";
import{Deposito} from "./Model/Deposito";
import { DateTime } from "ionic-angular/components/datetime/datetime";

@Component({
  selector: "imprimir",
  templateUrl: "imprimir.html"
})
export class ImprimirComponent {
  public deposito:Deposito;
  public col1 = ["Número de Documento:"," Fecha y Hora:","Nombre Corresponsal:","Concepto:","Monto:","Deposito en efectivo:",
"Monto Entregado:","Cambio:"];
  public col2;
  

 

  constructor() {

    this.deposito = new Deposito( "0001", new Date("dd/MM/yyyy").toString() , "Ahorros", 123456789, 10000, 123456, 123);
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

