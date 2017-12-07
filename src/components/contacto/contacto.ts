import { Component } from '@angular/core';

/**
 * Generated class for the ContactoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contacto',
  templateUrl: 'contacto.html'
})
export class ContactoComponent {

  text: string;

  constructor() {
    console.log('Hello ContactoComponent Component');
    this.text = 'Hello World';
  }

}
