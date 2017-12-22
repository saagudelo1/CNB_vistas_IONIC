import { Component, OnInit } from "@angular/core";
import { DateTime } from "ionic-angular/components/datetime/datetime";
import { registerModeConfigs } from "ionic-angular/config/mode-registry";

@Component({
  selector: "imprimir",
  templateUrl: "imprimir.html"
})
export class ImprimirComponent implements OnInit {
  
  public col1;
  public col2; 
  reimpresion:number;
  
  constructor() {


  }
  
  ngOnInit(){
    let Deposito:JSON = JSON.parse(localStorage.getItem("Deposito"));
    console.log("Los datos del depósito son: ", Deposito);
    this.col1 = ["Número de Transacción:"," Fecha y Hora:","Nombre CNB:","Número CNB:","Concepto:","Número de Cuenta:",
    "Nombre del Cliente:","Monto Depositado:","Monto Entregado:","Cambio:"];
    this.col2 = [Deposito["numeroTransaccion"], Deposito["fechaHora"], Deposito["nombreCNB"] , Deposito["numeroCNB"], Deposito["concepto"], Deposito["numeroCuenta"], Deposito["nombreCliente"], Deposito["montoDepositado"], Deposito["montoEntregado"], Deposito["cambio"]]
       
    this.reimpresion = 0;
    setTimeout(this.imprSelec,1000)

    
  }
  public imprSelec ()
  {var ficha=document.getElementById("DatosImp");
    var ventimp = window.open(' ','popimpr');
    if (ventimp == undefined){
      alert("Por favor habilite las ventanas emergentes")
    }
    else
    {
    ventimp.document.write(ficha.innerHTML);
    ventimp.print();
    ventimp.close();
    this.reimpresion += 1;
    }
  }
 
}

