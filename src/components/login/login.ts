



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '../error/error';
import { CabeceraComponent } from '../cabecera/cabecera';
import { LoginProvider } from '../../providers/login/login';
import { HttpParams } from '@angular/common/http';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: boolean = false;
  YaRegistrado: boolean = false;
  huellaDisponible = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _login: LoginProvider,
    private _platform: Platform,
    private _fingerPrint: FingerprintAIO,
    private _nativeStorage: NativeStorage) {


  }

  ngOnInit() {
    this._nativeStorage.getItem('StoredAuth')
      .then(
      data => {
        this.YaRegistrado = true;
        this.Prueba();
      },
      error => {
        this.YaRegistrado = false;
        this.Prueba();
      });
    localStorage.clear();
  }

  CerrarModal(){
    document.getElementById("HuellaAuth").style.display = "";
    document.getElementById("HuellaAuth").className = "modal fade";
  }
  async Prueba() {

    try {
      await this._platform.ready();
      const disp = await this._fingerPrint.isAvailable();
      if (disp === "OK") {
        this.huellaDisponible = true;
      }
      else {
        this.huellaDisponible = false;

      }
    }
    catch (e) {
      this.huellaDisponible = false;

    }
  }
  /**
    * Function to validate login
    */
  fingerPrintOptions: FingerprintOptions;
  async RegistroHuella() {
    this.fingerPrintOptions = {
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password',
      disableBackup: true
    }
    this.Prueba();
    if (this.huellaDisponible) {
      try {
        await this._platform.ready();
        await this._fingerPrint.show(this.fingerPrintOptions)
        .then(result => {
        this._nativeStorage.setItem('StoredAuth', { User: this.username, Pass: this.password }).then(
          data => {
            this.login();
          },
          error => {
            alert(JSON.stringify(error));
            alert("Error al registrar el usuario")
          }
        );
      }).catch((error: any) => console.log("error al consultar la huella"));

      }

      catch (e) {
        alert(e);

      }
    }
  }

  async LoginConHuella() {
    this.fingerPrintOptions = {
      clientId: "ID",
      clientSecret: "Secret",
      disableBackup: true
    }
    this.Prueba();
    if (this.huellaDisponible) {
      try {
        await this._platform.ready();
        await this._fingerPrint.show(this.fingerPrintOptions)
      .then(result => {
          this._nativeStorage.getItem('StoredAuth').then(
            data => {
              this.username = data.User;
              this.password = data.Pass;
              this.login();
            },
            error => {
              alert("No hay usuarios registrados");
            }
          );
        }).catch((error: any) => console.log("error al consultar la huella"));
      }
      catch (e) {
        alert(e);
      }
    }
  }
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




