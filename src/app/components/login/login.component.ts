import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginEvent } from '../../models/app-models';
import { JWT_AUTH_HEADER, JWT_AUTH_TOKEN } from '../../models/app-constants';

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
  constructor(private userService : UserService) {}

  ngOnInit() {
    this.hide = true;
    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required]),
        'remember': new FormControl(''),
    });
    this.loginForm.patchValue({checked: false});
  }

  emailErrorMessage(): String {
    return this.loginForm.hasError('required', ['email']) ? 'Please enter your email.' : 
      this.loginForm.hasError('email', ['email']) ? 'Not a valid email.': '';
  }

  isValid(): boolean {
    return this.loginForm.valid;
  }
  
  login() {
    const loginUser = this.loginForm.value;
    console.log(this.loginForm.value);
    this.userService.login(loginUser).subscribe( resp => {
      this.loginEvent = { action: "login", success: false };
      if (resp.status === 200) {
        this.loginEvent.success = true;
        const jwtToken = resp.headers.getALL(JWT_AUTH_HEADER);
        if (jwtToken.length> 0) {
          localStorage.setItem(JWT_AUTH_TOKEN, jwtToken[0]);
        }
        this.userService.eventEmitter.emit(this.loginEvent);
      }
    })
  }

}
