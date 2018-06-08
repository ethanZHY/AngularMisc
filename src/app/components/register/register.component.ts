import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SignUpUser } from '../../models/app-models';
import { Router } from '@angular/router';
import { compareValidator } from '../../directives/compare-password-validator.directive';
import { uniqueUsernameValidator } from '../../directives/unique-username-validator.directive';

/**
 * @author Ethan Zhang
 */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.userService.getAllUsers().subscribe();
  }

  createForm() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'username': new FormControl('', Validators.required, uniqueUsernameValidator(this.userService)),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'pwConfirm': new FormControl('', [Validators.required, compareValidator('password')]),
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get pwConfirm() {
    return this.registerForm.get('pwConfirm');
  }

  emailErrorMsg(): string {
    return this.email.errors['required'] ? 'Please enter your email.' :
      this.email.errors['email'] ? 'Not a valid email.' : '';
  }

  pwComfirmErrorMsg(): string {
    return this.pwConfirm.errors['required'] ? 'Password confirm is required.' :
      this.pwConfirm.errors['mismatch'] ? 'Password confirm do not match.' : '';
  }

  usernameErrorMsg(): string {
    return this.username.errors['required'] ? 'Username is required.' :
      this.username.errors['exist'] ? 'Username already exists.' : null;
  }

  register() {
    const user: SignUpUser = this.registerForm.value;
    this.userService.register(user).subscribe(resp => {
      if (resp.successful === true) {
        this.router.navigate(['/login']);
      }
    })
  }




}
