import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router}from '@angular/router';
import { ServiciosDPService } from '../servicios-dp.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  nombreHotel:string;
  hotelTDS:any;

  constructor( private ruta:ActivatedRoute,private _dpService:ServiciosDPService,private router: Router ) {

   }

  ngOnInit(): void {
   //Datos del Hotel(habitaciones)
    this.ruta.params.subscribe( params => {
       //obtener url --> nombre hotel
      this.nombreHotel=params['nombreH'];
      //console.log(this.nombreHotel);
      
      ////cargar hotel
        this._dpService.getHotel(this.nombreHotel).subscribe((myHotel) =>{
          this.hotelTDS= myHotel; 
          //console.log(this.hotelTDS);
        })
    } )

    // si this._dpService.getFactura() 
    this.antigua = this._dpService.getFactura() ;
    if(this.antigua){
      this.actual = this.antigua.precioTot;
    }
    
  }
  antigua;

  datosIds=[];
  precio = 0; 
  dias;
  //datos del STL
  recogidaDTS(_evento){
    //console.log("soy la regogida:"+_evento);
    this.precio=_evento[2];
    this.datosIds=_evento;
  }

  actual;
  precioActual(){
    this.actual = this.precio*this.dias;
  }

  pago(){
  
   let dts;
    if(this.antigua == null){
       dts= { 
        idHotel:this.datosIds[0],
        idHab:this.datosIds[1],
        idUsr:this._dpService.getId(),
        dias:this.dias,
        precioTot:this.actual.toString()
      }
    }else{//cañado el UID
      dts = this.antigua
      dts.idUsr=this._dpService.getId();
    }
     
    //olvido registrarse ?
   if (!this._dpService.getId()) { // guarda datos en servicio, --> lanza precio de 1hotel con factura
     console.log(this.nombreHotel); 
    
     this._dpService.setFactura(dts,this.nombreHotel);
     this.router.navigate(['/login' ]);
   }else{
     this._dpService.postFactura(dts).subscribe(
      response => {console.log(response);
        this._dpService.setFactura(null,null);
        let salida : any  = response;
        if(salida.salida == "OK" ){
          alert("reserva completada");
        }
        //this.router.navigate(['/hoteles', this._dpServ.getNombreHotel() ]); 
      }
    
     );
   }

  }

}
