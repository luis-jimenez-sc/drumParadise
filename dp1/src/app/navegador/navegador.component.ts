import {  Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ServiciosDPService } from '../servicios-dp.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css'],
 
})
export class NavegadorComponent implements OnInit  {
 
  registrado="";
  subscripcion : any;

  constructor( private _dpServ: ServiciosDPService,private router: Router,private ruta:ActivatedRoute) {
    
  }
  ngOnInit(): void {
   /* this.ruta.params.subscribe( params => {
      //obtener url --> nombre usuario
     this.registrado=params['nombreU'];
     console.log(this.registrado);
     
    });*/
  }

  recargar(){
    this.registrado=this._dpServ.getNombre();
  }

}
