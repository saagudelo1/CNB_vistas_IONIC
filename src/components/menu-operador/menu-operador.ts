import { Component } from '@angular/core';

/**
 * Generated class for the MenuOperadorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-operador',
  templateUrl: 'menu-operador.html'
})
export class MenuOperadorComponent {

  text: string;

  constructor() {
    console.log('Hello MenuOperadorComponent Component');
    this.text = 'Hello World';
  }

}
