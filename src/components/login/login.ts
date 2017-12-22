



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
    localStorage.clear();
  }

  /**
    * Function to validate login
    */
  login() {
    if (this.username == "diego" || this.username == "admin") {
      let ruta = "/loginStage/authentication/login";
      let body = {};
      let params = new HttpParams()
        .append("client_id", "banistmoATM")
        .append("username", this.username)
        .append("password", this.password)
        .append("grant_type", "password");

      this._login.PostToServer(ruta, body, params)
        .subscribe(response => {

          let valid = false;

          if (response.body["access_token"] != undefined) {
            valid = true;
            localStorage.setItem("access_token", response.body["access_token"]);

          }
          else {
            switch (response.body["error"]) {
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
            console.log("access_token", localStorage.getItem("access_token"))
            if (this.username == "admin") {
              this.router.navigate(['/Administrador']);
            } else if (this.username == "diego") {
              this.router.navigate(['/Operario']);
            } else {
              this.error = true;
            }

          }
        },
       error => {
         console.log(error.error)
          switch (error.error["error"]) {
            case "unauthorized_client":
              this.error = true;
              if (error.error["error_description"].includes("Multiple session not allowed.")) {
                alert("El inicio de sesion no fue exitoso\nmúltiples sesiones activas no permitidas");
              }
              break;
            default:
              alert("Error al pedir el token");
              break;
          }
        });
    }
    else {
      this.error = true;
      
    }
  }
}




