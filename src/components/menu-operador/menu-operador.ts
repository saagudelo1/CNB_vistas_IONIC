import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-operador',
  templateUrl: './menu-operador.html',
})
export class MenuOperadorComponent implements OnInit {
  public semaforo:string= "assets/semaforo/semaforo_verde.png";
  public Vnombre= ["Andrea Agudelo","Patricia Ocampa","Luis Fonsi","Santiago Mendez"];
  public nombre;
  public cupo;
  public mostrar:boolean= false;
  public barra:number=0;
  public barraVerde;
  public barraAmarillo;
  public barraRojo;  
  colores=["semaforo_rojo.png","semaforo_amarillo.png","semaforo_verde.png","semaforo_dorado.png"];
  
  constructor() { }
  
  ngOnInit() {
    let num = Math.floor(Math.random() * (4 - 0)) + 0;
    this.nombre = this.Vnombre[num];
    console.log(this.nombre)
    setInterval(()=>{    
      this.barra++;      
      this.cupo = (100-this.barra); 
      this.llenarBarra1();   
    },300);
    
 
  }
  llenarBarra1(){    
    if (this.barra <= 50) {
      this.barraVerde=this.barra+"%";
      this.semaforo = "assets/semaforo/"+this.colores[2];
    }else{
      if (this.barra <= 80) {
        this.barraAmarillo=(this.barra-50)+"%";
        this.semaforo = "assets/semaforo/"+this.colores[1];
      } else {
        if (this.barra <= 100) {
          this.barraRojo=(this.barra-80)+"%";
          this.semaforo = "assets/semaforo/"+this.colores[0];
        } else {
          this.barra = this.barraRojo = 0;          
          this.barraAmarillo = this.barraVerde = 0;
        }        
      }      
    }
  };

  mosBarra(val:boolean){    
      this.mostrar=val;          
  }
  
}
