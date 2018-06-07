import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SignUpUser } from '../../models/app-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'confirm': new FormControl('', [this.confirmValidator()]),
    });
  }

  emailErrorMessage(): string {
    return this.registerForm.hasError('required', ['email']) ? 'Please enter your email.' : 
      this.registerForm.hasError('email', ['email']) ? 'Not a valid email.': '';
  }

  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} => {
      if (control.value){
        const valid = control.value === this.registerForm.get('password').value;
        return valid ? null : {'mismatch': true};
      }
    }
  }

  isValid(): boolean {
    return this.registerForm.valid;
  }

  register() {
    const user = this.registerForm.value;
    this.userService.register(user).subscribe(resp=>{
      if (resp.successful === true) {
        this.router.navigate(['/login']);
      }
    })
    
  }




}
