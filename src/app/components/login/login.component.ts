import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.hide = true;
    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }

  emailErrorMsg(): string {
    return this.loginForm.hasError('required', ['email']) ? 'Please enter your email.' : 
      this.loginForm.hasError('email', ['email']) ? 'Not a valid email.': '';
  }
  
  login() {
    const loginUser = this.loginForm.value;
    console.log(this.loginForm.value);
    this.userService.login(loginUser).subscribe( resp => {
      this.loginEvent = { action: "login", success: false };
      if (resp.status === 200) {
        this.router.navigateByUrl('/home');
        this.loginEvent.success = true;
        const jwtToken = resp.headers.get(JWT_AUTH_HEADER);
        this.authService.setToken(jwtToken);
        this.userService.eventEmitter.emit(this.loginEvent);
      }
    })
  }
  
}
