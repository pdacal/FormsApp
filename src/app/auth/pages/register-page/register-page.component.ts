import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.EmailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },
  { validators:[
    this.validatorsService.isFieldOneEqualsFieldTwo('password', 'password2')
  ]}

  )


  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private EmailValidator: EmailValidator,
    ){}

  isValidField(field: string){
    //obtener validacion dende un servicio
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
