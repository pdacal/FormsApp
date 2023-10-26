import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})


//validacion asincrona do email
export class EmailValidator implements AsyncValidator {

  constructor() { }
/**vai comprobando se coincide co valor dado (deberiase comprobar cunha base de datos) */
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({email})

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {
        console.log({ email });
        if (email === 'fernando@google.com'){
          subscriber.next({emailTaken:true});
        subscriber.complete();
        }
        subscriber.next(null);
        subscriber.complete();
    }).pipe( delay(3000) )
    return httpCallObservable;

    // return this.http.get<any>(`http://localhost:3000/users?q=${ email }`)
    // .pipe(
    //   map( resp => {
    //     return (resp.length === 0) ? null : {emailTaken: true}
    //   }) )
  }





}
