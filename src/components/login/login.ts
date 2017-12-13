import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '../error/error';
import { CabeceraComponent } from '../cabecera/cabecera';
import { LoginProvider } from '../../providers/login/login';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _login: LoginProvider) { }

  ngOnInit() {
  }



  Cambio() {
    console.log(this.username);
    console.log(this.password);
  }

  /**
   * Function to validate login
   */


  login() {

    let ruta = "/loginStage/login";
    let body = {};
    let params = new HttpParams()
      .append("client_id", "banistmoATM")
      .append("username", this.username)
      .append("password", this.password)
      .append("grant_type", "password");

    this._login.PostToServer(ruta, body, params)
      .subscribe(response => {

        let valid = false;
        
        if (response["access_token"] != undefined) {
          valid = true;
        }
        else {
          switch (response["error"]) {
            case "invalid_authentication":
            case "invalid_request":
            case "invalid_client":
              this.error = true;
              break;
            default:
              this.error = true;
              alert("Unknown error");
              break;
          }
        }
        if (valid) {
          localStorage.setItem("user", this.username);
          localStorage.setItem("pass", this.password);
          let ruta = "/loginStage/getUserType";
          let body = {
            "body": {
              "username": this.username,
              "password": this.password
            }
          };
          let params = new HttpParams();
          this._login.PostToServer(ruta, body, params)
            .subscribe(res => {
              console.log();
              if (res["UserType"] == "admin") {
                this.router.navigate(['/Administrador']);
              } else if (res["UserType"] == "operador") {
                this.router.navigate(['/Operario']);
              } else {
                this.error = true;
              }
            },
            err => {
              alert("Error al buscar el tipo de usuario");
            })
        }
      },
      error => {
        alert("Error al pedir el token");
        
      });


  }
}
