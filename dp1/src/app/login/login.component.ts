import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosDPService } from '../servicios-dp.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  constructor(private _fb: FormBuilder, private _dpServ: ServiciosDPService,private router: Router) { }

  ngOnInit(): void {
    this.formulario = this._fb.group({
      correo: ['lugy94@gmail.com', [Validators.required,Validators.email]],
      pass: ['aA2@asdfgs', [Validators.required, Validators.pattern(/^(?=.{10,}$)(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)]],
      recordarPass: [''],
    })

  }



  get correo() {
    return this.formulario.get('correo');
  }

  get pass() {
    return this.formulario.get('pass');
  }

  get recordarPass() {
    return this.formulario.get('recordarPass');
  }

  recordar() {
    if (this.recordarPass.value) {
      //crear cookie  --> home
      let valor= this.formulario.value['correo'] +"=" +this.formulario.value['pass']+";max-age="+30 * 24 * 60 * 60
      console.log(valor);
      
      document.cookie = valor;
    }
  }

  mypass;
  viendoPass(verPass,myPass){
    //console.log(myPass.type);
    
    if (verPass) {
      myPass.type="text";
    } else {
      myPass.type="password";
    }
    
  }


  enviar(formulario) {

    this.recordar();

    const pax = formulario.value['pass'];
    const usr = formulario.value['correo'];
    const env =JSON.parse('{"usuario":"'+usr+ '", "pass":"'+pax+'"}');
    //console.log(env);
    
    this._dpServ.postLogin(env).subscribe( response => {
     
      let a:any = response
      this._dpServ.setNombre( a.data); 
      this._dpServ.setId(a.myId)
      
      //console.log(this._dpServ.getFactura());
      if(!this._dpServ.getFactura()){
        if( this._dpServ.getId() !="" && this._dpServ.getNombre() != "" ){ //??
          console.log(this._dpServ.getNombre()); 
          
          //this.navegador.recargar();
          this.router.navigate(['/hoteles', this._dpServ.getNombre() ]);
  
        }
      }else{//si soy llamado desde errPago
        console.log(this._dpServ.getNombreHotel());
        this.router.navigate(['/hotel', this._dpServ.getNombreHotel() ]); 
      }
     
      
    } )
      

  }

}
