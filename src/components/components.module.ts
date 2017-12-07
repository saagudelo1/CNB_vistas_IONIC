import { NgModule } from '@angular/core';
import { CabeceraComponent } from './cabecera/cabecera';
import { ContactoComponent } from './contacto/contacto';
import { ErrorComponent } from './error/error';
import { LoginComponent } from './login/login';
import { LogoutComponent } from './logout/logout';
import { MenuAdminComponent } from './menu-admin/menu-admin';
import { MenuOperadorComponent } from './menu-operador/menu-operador';
@NgModule({
	declarations: [CabeceraComponent,
    ContactoComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    MenuAdminComponent,
    MenuOperadorComponent],
	imports: [],
	exports: [CabeceraComponent,
    ContactoComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    MenuAdminComponent,
    MenuOperadorComponent]
})
export class ComponentsModule {}
