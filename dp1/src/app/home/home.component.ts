import { Component, OnInit } from '@angular/core';
import { ServiciosDPService } from '../servicios-dp.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logo: string = "../../assets/imgs/image0.png";
  logoalt: string = "logoDP"

  imgSnow = "../../assets/imgs/animacion.svg"

  constructor(private _dpServ: ServiciosDPService) { }

  ngOnInit(): void {
    //leer coockie
    //this.cargar();

  }

  cargar() { /// Probarr//////////////////////
    let coockies = document.cookie.split(";");
    for (const coockie of coockies) {
      if (coockie.indexOf("logDP") != -1) {
        console.log("tengo Cookies");

        let igual = coockie.indexOf("=") + 1
        let valor = coockie.substr(igual,)

        let signo = valor.indexOf("-->")
        let usr = valor.substr(0, signo)
        let pax = valor.substr(signo + 3,)
        const env = JSON.parse('{"usuario":"' + usr + '", "pass":"' + pax + '"}');

        this._dpServ.postLogin(env).subscribe(response => {
          let a: any = response;
          this._dpServ.setNombre(a.data);
        })
      }
    }
  }

  imposible(){
    let randX = Math.floor(Math.random() * (300 - 50)) + 50;  
    let randY = Math.floor(Math.random() * (300 - 50)) + 50;  
    //console.log(randX);
    document.getElementById("uncm").style.left= randX+"px";
    document.getElementById("uncm").style.top= randY+"px";
  }


}
