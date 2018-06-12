import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn, NG_ASYNC_VALIDATORS, AsyncValidator, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

/**
 * @author Ethan Zhang
 */

export function uniqueUsernameValidator(userService: UserService): AsyncValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByUsername(control.value).pipe(
      map(users => {
        return users && users.length > 0 ? {'taken': true} : null;
      })
    )
  }
}

@Directive({
  selector: '[uniqueUsername]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true}]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
  
  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
    return uniqueUsernameValidator(this.userService)(control);
  }

}
