import { NgModule } from '@angular/core';
import { CabeceraComponent } from './cabecera/cabecera';
import { ContactoComponent } from './contacto/contacto';
import { ErrorComponent } from './error/error';
import { LoginComponent } from './login/login';
import { LogoutComponent } from './logout/logout';
import { MenuAdminComponent } from './menu-admin/menu-admin';
import { MenuOperadorComponent } from './menu-operador/menu-operador';
import { ImprimirComponent } from './imprimir/imprimir';
import { NumeroCuentaComponent } from './numero-cuenta/numero-cuenta';
import { CabeceraDepositoComponent } from './cabecera-deposito/cabecera-deposito';
@NgModule({
	declarations: [
    CabeceraComponent,
    ContactoComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    MenuAdminComponent,
    MenuOperadorComponent,
    ImprimirComponent,
    NumeroCuentaComponent,
    CabeceraDepositoComponent],
	imports: [],
	exports: [CabeceraComponent,
    ContactoComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    MenuAdminComponent,
    MenuOperadorComponent,
    ImprimirComponent,
    NumeroCuentaComponent,
    CabeceraDepositoComponent]
})
export class ComponentsModule {}
// import { NgModule } from '@angular/core';
// import { CabeceraComponent } from './cabecera/cabecera';
// import { ContactoComponent } from './contacto/contacto';
// import { ErrorComponent } from './error/error';
// import { LoginComponent } from './login/login';
// import { LogoutComponent } from './logout/logout';
// import { MenuAdminComponent } from './menu-admin/menu-admin';
// import { MenuOperadorComponent } from './menu-operador/menu-operador';
// import { ImprimirComponent } from './imprimir/imprimir';
// @NgModule({
// 	declarations: [CabeceraComponent,
//     ContactoComponent,
//     ErrorComponent,
//     LoginComponent,
//     LogoutComponent,
//     MenuAdminComponent,
//     MenuOperadorComponent,
//     ImprimirComponent],
// 	imports: [],
// 	exports: [CabeceraComponent,
//     ContactoComponent,
//     ErrorComponent,
//     LoginComponent,
//     LogoutComponent,
//     MenuAdminComponent,
//     MenuOperadorComponent,
//     ImprimirComponent]
// })
// export class ComponentsModule {}
