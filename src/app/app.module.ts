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


import { MyApp } from './app.component';
import { OperatorServicesProvider } from '../providers/operator-services/operator-services';
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
  { path: 'Administrador', component: MenuAdminComponent },
  { path: 'Operario', component: MenuOperadorComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'logout', component: LogoutComponent },
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
    CabeceraComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OperatorServicesProvider
  ]
})
export class AppModule {}
