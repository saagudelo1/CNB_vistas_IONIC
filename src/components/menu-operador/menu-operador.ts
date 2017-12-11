import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-operador',
  templateUrl: './menu-operador.html',
})
export class MenuOperadorComponent implements OnInit {
  public semaforo:string= "/assets/semaforo/semaforo_rojo.png";
  public ventas;
  public mostrarr;
  colores=["semaforo_rojo.png","semaforo_amarillo.png","semaforo_verde.png","semaforo_dorado.png"];
  
  constructor() { }
  
  ngOnInit() {
    
    
    setInterval(()=>{
      let num = Math.floor(Math.random() * (4 - 0)) + 0;
      this.ventas= (num+1) +"00"; 
      this.mostrarr =this.mostrar();   
      this.semaforo = "/assets/semaforo/"+this.colores[(num)];     
    }, 2000);
  }
  mostrar(){
    if(this.ventas=="100" ||this.ventas=="200")
      return false;
    else
     return true;
  };
  
  

}
