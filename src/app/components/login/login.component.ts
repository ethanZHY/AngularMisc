import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginEvent } from '../../models/app-models';
import { JWT_AUTH_HEADER } from '../../models/app-constants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * @author Ethan Zhang
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;
  loginEvent: LoginEvent;
  invalidCrediential: boolean;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.hide = true;

    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, this.passwordError()]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }

  emailErrorMsg(): string {
    return this.email.errors['required'] ? 'Please enter your email.' : 
      this.email.errors['email'] ? 'Not a valid email.': '';
  }

  passwordErrorMsg(): string {
    return this.password.errors['required'] ? 'Password can not be empty.' :
      this.password.errors['credential'] ? 'Incorrect password.' : null;
  }

  passwordError(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    }
  }

  login() {
    const loginUser = this.loginForm.value;
    this.userService.login(loginUser).subscribe( resp => {
      this.loginEvent = { action: "login", success: false };
      if (resp.status === 200) {
        this.router.navigateByUrl('/home');
        this.loginEvent.success = true;
        const jwtToken = resp.headers.get(JWT_AUTH_HEADER);
        this.authService.setToken(jwtToken);
        this.userService.eventEmitter.emit(this.loginEvent);
      }
    },
    error => {
      if (error.status === 403)
        this.password.setErrors({'credential': true});
    });
  }
  
}
