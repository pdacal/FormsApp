import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  //outra forma:
  // public myForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(''),
  //     price: new FormControl(0),
  //     inStorage: new FormControl(0)
  //   }
  // );

  /*
  uso de VALIDATORS para establecer validacions/requisitos que deben cumplir os campos
  */
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
  }

  isValidField( field: string ): boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  /* se o formulario NON ten ese campo -> null
  se ten o campo pero non ten errores(nyll -> obxeto vacio -> non seguimos
  se ten o campo e ten errores-> obxeto
  Primeiro co forOf accedemos aos erros que conten o Object errors
  */
  getFieldError( field: string ): string | null{
    if(!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`
      }
    }
    return null;
  }


/* resetear o formulario cando se garda + restablecer os valores x defecto
se non e valido, que marque os erros*/
  onSave():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
      }
    //  console.log(this.myForm.value);
      this.myForm.reset({price:0, inStorage:0});
      return ;

  }

}
