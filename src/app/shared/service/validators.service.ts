import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }
    return null;
  }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  isFieldOneEqualsFieldTwo(field1: string, field2: string){
    //para acceder ao formulario dende onde se chama (chamase dentro do FormGroup declarado no ts)
    return (formGroup: AbstractControl) : ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      //comprobar que NON coinciden, de ser asi, activamos o error notEqual
      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({ notEqual: true});
        return {notEqual: true}
      }
      //se son iguais: facer limpieza de erros
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

}
