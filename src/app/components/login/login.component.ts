import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;
  constructor() { }

  ngOnInit() {
    this.hide = true;
    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required]),
    });
  }

  emailErrorMessage(): String {
    return this.loginForm.hasError('required', ['email']) ? 'Please enter your email.' : 
      this.loginForm.hasError('email', ['email']) ? 'Not a valid email.': '';
  }

  isValid(): boolean {
    return this.loginForm.valid;
  }

}
