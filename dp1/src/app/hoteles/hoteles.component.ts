import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../interfaces/hoteles';
import { ServiciosDPService } from '../servicios-dp.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {

  constructor(private _dpService:ServiciosDPService) {
    
   }


  hoteles:any;

  ngOnInit(): void {
   this._dpService.getHoteles().subscribe((hoteles:Hotel[]) =>{
     this.hoteles= hoteles;
     //console.log(this.hoteles);
     
   })

  
  }

}
