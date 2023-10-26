import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['F', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  })


  public person ={
    gender: 'F',
    wantNotifications: false,
  }

  constructor ( private fb : FormBuilder){}

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField( field: string ): boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  onSave(){
    if( this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    //borrar termsAndConditions de Person, que llo engade o formulario
    const{ termsAndConditions, ...newPerson} = this.myForm.value
    this.person = newPerson;
    console.log(this.person)
  }
}
