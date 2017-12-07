import { Component } from '@angular/core';

/**
 * Generated class for the CabeceraComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cabecera',
  templateUrl: 'cabecera.html'
})
export class CabeceraComponent {

  text: string;

  constructor() {
    console.log('Hello CabeceraComponent Component');
    this.text = 'Hello World';
  }

}
