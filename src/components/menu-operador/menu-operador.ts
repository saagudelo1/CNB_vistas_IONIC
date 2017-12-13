import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-operador',
  templateUrl: './menu-operador.html',
})
export class MenuOperadorComponent implements OnInit {
  public semaforo:string= "assets/semaforo/semaforo_rojo.png";
  public ventas;
  public mostrarr;
  public barra:number=0;
  public barraVerde;
  public barraAmarillo;
  public barraRojo;  
  colores=["semaforo_rojo.png","semaforo_amarillo.png","semaforo_verde.png","semaforo_dorado.png"];
  
  constructor() { }
  
  ngOnInit() {
    setInterval(()=>{    
      this.barra++;      
      this.ventas = (100-this.barra); 
      this.llenarBarra1();
      

    },300);
    
    setInterval(()=>{
      let num = Math.floor(Math.random() * (4 - 0)) + 0;
      
      this.mostrarr =this.mostrar();   
      this.semaforo = "assets/semaforo/"+this.colores[(num)];     
    }, 2000);
  }
  llenarBarra1(){    
    if (this.barra <= 50) {
      this.barraVerde=this.barra+"%";
    }else{
      if (this.barra <= 80) {
        this.barraAmarillo=(this.barra-50)+"%";
      } else {
        if (this.barra <= 100) {
          this.barraRojo=(this.barra-80)+"%";
        } else {
          this.barra = 0;
          this.barraRojo = 0;
          this.barraAmarillo = 0;
          this.barraVerde = 0;
          
          
        }        
      }      
    }

  };
  
  mostrar(){
    if(this.ventas=="100" ||this.ventas=="200")
      return false;
    else
     return true;
  };

  
  
  

}
