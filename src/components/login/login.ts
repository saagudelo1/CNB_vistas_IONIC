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

 /**
   * Function to validate login
   */
  login() {
    if (this.username == "admin" || this.username == "operador") {
    let ruta = "/dev/login";
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
          // localStorage.setItem("user", this.username);
          // localStorage.setItem("pass", this.password);
          // let ruta = "/loginStage/getUserType";
          // let body = {
          //   "body": {
          //     "username": this.username,
          //     "password": this.password
          //   }
          // };
          // let params = new HttpParams();
          // this._login.PostToServer(ruta, body, params)
          //   .subscribe(res => {
          //     console.log();
          //     if (res.body["UserType"] == "admin") {
          //       this.router.navigate(['/Administrador']);
          //     } else if (res.body["UserType"] == "operador") {
          //       this.router.navigate(['/Operario']);
          //     } else {
          //       this.error = true;
          //     }
          //   },
          //   err => {
          //     alert("Error al buscar el tipo de usuario");
          //   })
          console.log("access_token",localStorage.getItem("access_token"))
          if (this.username == "admin") {
            this.router.navigate(['/Administrador']);
          } else if (this.username == "operador") {
            this.router.navigate(['/Operario']);
          } else {
            this.error = true;
          }

        }
      },
      error => {
        alert("Error al pedir el token");

      });
    }
    else{
      this.error = true;
    }

  }


}
