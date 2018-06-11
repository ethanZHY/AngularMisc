import { Injectable } from '@angular/core';
import { JWT_AUTH_TOKEN } from '../models/app-constants';
import { JwtHelperService } from '@auth0/angular-jwt';
/**
 * @author Ethan Zhang
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) { }
  
  getToken() {
    return localStorage.getItem(JWT_AUTH_TOKEN);
  }

  setToken(token: string) {
    if (token.length > 0){
      localStorage.setItem(JWT_AUTH_TOKEN, token);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }
  
}
