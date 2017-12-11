import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.html',
})
export class CabeceraComponent implements OnInit {

  constructor(private router: Router, ) { }
  loged: Boolean = false;
  ngOnInit() {
    if (this.router.url.toUpperCase().includes("Operario".toUpperCase()) || this.router.url.toUpperCase().includes("Administrador".toUpperCase()))
      this.loged = true;
    else
      this.loged = false;


  }

}
