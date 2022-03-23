import { Component, Input, OnInit, Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-hab-stl',
  templateUrl: './hab-stl.component.html',
  styleUrls: ['./hab-stl.component.css'],
   //mas eficiente solo carga 1 vez
   changeDetection:ChangeDetectionStrategy.OnPush
})
export class HabSTLComponent implements OnInit {
  @Input() habitacion:any //:Habitacion
  @Output() selecccionado : EventEmitter<Array <string> > = new EventEmitter(); //emit array


  constructor() { }

  parrafo:Array<string>=[];
  ngOnInit(): void {
    let parrafos= this.habitacion.descripcion ;
    let inicio=0;
    for (let index = 0; index < parrafos.length; index++) {
     
      if (parrafos.charAt(index) == parrafos.charAt(index).toUpperCase() && parrafos.charAt(index).trim() != "" ) {
        //substring inicio--fin
        //console.log(parrafos.charAt(index));
        let temp = parrafos.substring(inicio,index)
        //console.log(temp);

        if (temp.length>2 ) {
          this.parrafo.push(temp);
        }else if(parrafos.charAt(index)=="V"){
          this.parrafo.push("TV");
        }

        inicio=index;
       
      }
     
    }
    //console.log(parrafos.substring(inicio,));
    this.parrafo.push(parrafos.substring(inicio,));

    //////////////////
    //console.log(this.parrafo);
    
  }

  seleccionando(){
    let enviar = [];
    enviar.push(this.habitacion.idHotel)
    enviar.push(this.habitacion._id)//idHab
    enviar.push(this.habitacion.precio.$numberDecimal)
    
    //console.log(enviar);
    
    this.selecccionado.emit(enviar)
  }

}
