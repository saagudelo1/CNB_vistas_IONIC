import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login';
import { MenuAdminComponent } from '../components/menu-admin/menu-admin';
import { MenuOperadorComponent } from '../components/menu-operador/menu-operador';
import { ErrorComponent } from '../components/error/error';
import { ContactoComponent } from '../components/contacto/contacto';
import { LogoutComponent } from '../components/logout/logout';
import { CabeceraComponent } from '../components/cabecera/cabecera';
import { ImprimirComponent } from '../components/imprimir/imprimir';

import { MyApp } from './app.component';

import { OperatorServisesProvider } from '../providers/operator-servises/operator-servises';

import { LoginProvider } from '../providers/login/login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorProvider } from '../providers/interceptor/interceptor';



const routes: Routes = [
  { path: 'Administrador', component: MenuAdminComponent },
  { path: 'Operario', component: MenuOperadorComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'imprimir', component: ImprimirComponent },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    MenuAdminComponent,
    MenuOperadorComponent,
    ErrorComponent,
    ContactoComponent,
    LogoutComponent,
    CabeceraComponent,
    ImprimirComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OperatorServisesProvider
    LoginProvider,
    InterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    },
  ]
})
export class AppModule {}
