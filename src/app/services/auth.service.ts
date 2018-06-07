import { Injectable } from '@angular/core';
import { JWT_AUTH_TOKEN } from '../models/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  getToken() {
    return localStorage.getItem(JWT_AUTH_TOKEN);
  }

  setToken(token: string) {
    if (token.length > 0){
      localStorage.setItem(JWT_AUTH_TOKEN, token);
    }
  }

  isLoggedIn() { }
}
