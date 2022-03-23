import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ServiciosDPService {

  constructor(private http: HttpClient) { }

  /////// GET SET NOMBR + ID
  usr="";
  getNombre(){
    return this.usr;
  }
  setNombre(cambio){
    this.usr=cambio;
    return null;
  }
    //ID
  id ="";
  getId(){
    return this.id;
  }
  setId(cambio){
    this.id=cambio;
  }

   mV = "http://ec2-15-237-154-178.eu-west-3.compute.amazonaws.com";
   local="http://localhost:3000";
   /// http://ec2-15-237-154-178.eu-west-3.compute.amazonaws.com || http://localhost:3000

  //ver Idioma
  /*
  PostIdioma(idioma) {
    let enviose=  JSON.stringify(idioma);
    console.log(enviose);
    return this.http.post('http://localhost:3000/clientes/test', enviose);
  }*/
  //Loguearse correo + pass
  postLogin(formulario){
    return this.http.post(this.local+'/login', formulario)
  }
  //registarse con el Formulario
  postFormulario(formulario){
    return this.http.post(this.local+'/registro', formulario)
  }
 

  ////GETTERS
  //cargar hoteles de BD (SIN INFO) 
 // -->
  getHoteles(){
    return this.http.get(this.local+'/hoteles')
  }

  //enviar nombre / recibir dts de mi hotel (INFO url)  //hacer
  getHotel(nombre){
    let url = this.local+'/hotel/habitacion/'+nombre  
    ///hotel/habitacion/:nombreH
    //console.log(url);
    return this.http.get(url)
  }

  ///////pagar
  postFactura(datoses){
    return this.http.post(this.local+'/hotel/factura',datoses) 
  }

  factura = null;
  nombreHotel;

  setFactura(temp,nombreHotel){
    this.factura = temp;
    this.nombreHotel = nombreHotel;
  }
  getFactura(){
    return this.factura;
  }

  getNombreHotel(){
    return this.nombreHotel;
  }


}

