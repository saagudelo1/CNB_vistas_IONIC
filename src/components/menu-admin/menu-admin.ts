import { Component } from '@angular/core';

/**
 * Generated class for the MenuAdminComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-admin',
  templateUrl: 'menu-admin.html'
})
export class MenuAdminComponent {

  text: string;

  constructor() {
    console.log('Hello MenuAdminComponent Component');
    this.text = 'Hello World';
  }

}
