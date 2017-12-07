import { NgModule } from '@angular/core';
import { CabeceraComponent } from './cabecera/cabecera';
import { ContactoComponent } from './contacto/contacto';
import { ErrorComponent } from './error/error';
@NgModule({
	declarations: [CabeceraComponent,
    ContactoComponent,
    ErrorComponent],
	imports: [],
	exports: [CabeceraComponent,
    ContactoComponent,
    ErrorComponent]
})
export class ComponentsModule {}
