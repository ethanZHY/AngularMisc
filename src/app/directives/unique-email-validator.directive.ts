import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

export function uniqueEmailValidator(userService: UserService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByEmail(control.value).pipe(
      map(users => {
        return users && users.length > 0 ? {'taken': true} : null;
      })
    );
  }
}

@Directive({
  selector: '[UniqueEmail]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueEmailValidator(this.userService)(control);
  }

}
