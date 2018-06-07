import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginEvent, LoginUser, SignUpUser } from '../models/app-models';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { JWT_AUTH_TOKEN } from '../models/app-constants';
import { Router } from '@angular/router';
/**
 * @author Ethan Zhang
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  eventEmitter: EventEmitter<LoginEvent> = new EventEmitter();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(loginUser: LoginUser): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>('/login', loginUser, {});
  }

  logout() {
    localStorage.removeItem(JWT_AUTH_TOKEN);
    this.router.navigateByUrl('/login');
  }
  
  register(user: SignUpUser) {
    return this.httpClient.post<any>('/register', user, {});
  }
  
}
