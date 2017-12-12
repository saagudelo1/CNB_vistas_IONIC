import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ErrorComponent} from '../error/error';
import { CabeceraComponent} from '../cabecera/cabecera';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error:boolean=false;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }



  Cambio(){
    console.log(this.username);
    console.log(this.password);
  }

  /**
   * Function to validate login
   */
  login() {    
    localStorage.setItem("user",this.username);
    localStorage.setItem("pass",this.password);
    if(this.username == "admin"){
      this.router.navigate(['/Administrador']);
    }else if(this.username == "operador"){
      this.router.navigate(['/Operario']);
    }else{
      this.error=true;
    }
  }
}
