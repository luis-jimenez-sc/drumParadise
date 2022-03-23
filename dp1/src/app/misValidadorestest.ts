import { AbstractControl, Validators, ValidationErrors, PatternValidator, FormGroup } from '@angular/forms';

export class MisValidadores{
   
  static passCoincidentes(pass1: string, pass2: string) : ValidationErrors|null {
    if( pass1!=pass2 ){
        console.log("ps err no coinciden-- ");
        
        return {errCoincidencia:true}
       }
       return null;
  }

  //
  static validarPass(control : AbstractControl): ValidationErrors|null{
    const pat1 = "/^(?=.{10,}$)(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/";
    const reg = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/"
    if(! new RegExp(pat1).test(control.value)) {
      console.log(new RegExp(pat1).test(control.value));
      
      return {errValPass:true}
    }
    return null;
  }

  static regexx(control : AbstractControl): ValidationErrors|null{
      const pat1 = "/^(?=.{10,}$)(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/";
      if(control.value.match(pat1)){
        return {errValPass:true}
      }
      return null;
    }

}
