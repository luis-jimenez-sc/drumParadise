import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MisValidadores } from '../misValidadorestest';
import { ServiciosDPService } from '../servicios-dp.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  opciones: Array<any> 
  
   idioma= 
   [
     {'lbl':'Nombre:','ph':'introduce nombre','ttl':'introduce Nombre valido','erOblig':'nombre obligatorio'},
     {'lbl':'Apellidos:','ph':'introduce apellidos','ttl':'introduce Apellidos','erOblig':'apellido obligatorio'},
     {'lbl':'Correo:','ph':'introduce correo','ttl':'debe contener direccion@dominio.com/es','erOblig':'correo obligatorio','erTipo':'email invalido'},
     {'lbl':'Teléfono:','ph':'introduce teléfono','ttl':'debe contener 9 numeros','erOblig':'telefono obligatorio','erTipo':'numero con al menos de 9 digitos'},
     {'lbl':'Pais:','options':[
       { description: 'España', value: 'esp' },
       { description: "Francia", value: 'fr' },
       { description: "Portugal", value: 'prt' }
     ]},
     {'lbl':'Contraseña:','ttl':'debe contener una mayuscula,minuscula,numero,caracter especial y mas de 9 digitos'},
     {'lbl':'Confirmar contraseña:','erOblig':'confirmacion obligatoria','erTipo':'No coinciden'},
     {'check':'Aceptio los términos:','erOblig':' si tiene alguna duda, consulte con atencion al cliente'},
     {'btn':'Enviar'},
     {'salu2':'Gracias por confiar en nosotros'}
   ];

  get nombreJ() {return this.idioma[0]} 
  get apelli2J() {return this.idioma[1]} 
  get correoJ() {return this.idioma[2]} 
  get telefonoJ() {return this.idioma[3]} 
  get paisJ() {return this.idioma[4]} 
  get pass1J() {return this.idioma[5]} 
  get pass2J() {return this.idioma[6]} 
  get checkJ() {return this.idioma[7]} 
  get btnJ() {return this.idioma[8]} 
  get salu2() {return this.idioma[9]} 


  formulario: FormGroup;
  constructor(private _fb: FormBuilder,private _dpServ:ServiciosDPService,private router: Router ) {
    this.opciones= this.paisJ.options;
  }

  ngOnInit(): void {


    /////
    this.formulario = this._fb.group(
      {
        nombre: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
        pais: ['esp'],

        passwords:this._fb.group({
          pass: ['aA2@asdfgs', [Validators.required, Validators.pattern(/^(?=.{10,}$)(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)]],
          //aA2@asdfgs
          passConf: ['aA2@asdfgs', [Validators.required,],]//,{ validator: this.passwordConf }]//pass==pasConf
        }),
        terminos: ["", Validators.requiredTrue],
      });
  }

 
  confirmada = false;
  passConfMy(){
    if (this.pass.value == this.passConf.value) {
      console.log(" pas iguales");
      this.confirmada = true ;
    }else{
      console.log("alerta error pas !iguales");
      this.confirmada = false;
    }
  
  }
  

  passwordConf(c: AbstractControl): { errors: boolean } {
    //console.log(c.value);//pasconf val
    // console.log(c._parent.value.passConf);
    console.log(c);
    if (c.get('pass').value !== c.get('passConf').value) {
      console.log("alerta error pas != iguales");
      return { errors: true };
    }
    return { errors: false };
  }


  get nombre(){
    return this.formulario.get('nombre');
  }
  get apellidos(){
    return this.formulario.get('apellidos');
  }
  get pais(){
    return this.formulario.get('pais');
  }
  get telefono(){
    return this.formulario.get('telefono');
  }
  get terminos(){
    return this.formulario.get('terminos');
  }
  get email(){
    return this.formulario.get('email');
  }

  //pass
  get pass(){
    return this.formulario.get(['passwords','pass']);
  }
  get passConf(){
    return this.formulario.get(['passwords','passConf']);
  }

 

  onSubmit(formulario) {
    const dts= {
      nombre: formulario.value['nombre'],
      apellidos:formulario.value['apellidos'],
      pais: formulario.value['pais'],
      telefono: formulario.value['telefono'],
      email:formulario.value['email'],
      pass:formulario.value['passwords'].pass
    }

    this._dpServ.postFormulario(dts).subscribe(response =>{
      //console.log(response); T/F
      if (response) {
        //add nombre
        this.router.navigate(['/login']); 
      }else{
        this.router.navigate(['/registro']); 
      }
      //cambio de pag + add nombre

    } )
    
  }

}
