import { Injectable, EventEmitter } from '@angular/core';
import { LoginEvent, LoginUser, SignUpUser } from '../models/app-models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  private JSON_PLACEHOLDE_URL = "https://jsonplaceholder.typicode.com/users";

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(loginUser: LoginUser): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>('/login', loginUser, {observe: 'response'});
  }

  logout() {
    localStorage.removeItem(JWT_AUTH_TOKEN);
    this.router.navigateByUrl('/login');
  }
  
  register(user: SignUpUser) {
    return this.httpClient.post<any>('/users/sign-up', user, {observe: 'response'});
  }

  getAllUsers() {
    return this.httpClient.get<any[]>(this.JSON_PLACEHOLDE_URL).pipe(
      map(users => {
        const usernames = [];
        users.forEach( u => usernames.push({username: u.username, email: u.email}));
        return usernames;
      }),
      tap(users => console.log(users))
    );
  }

  getUserByUsername(username: string) {
    return this.httpClient.get<any[]>(`${this.JSON_PLACEHOLDE_URL}?username=${username}`);
  }

  getUserByEmail(email: string) {
    const par = new HttpParams().set('email', email);
    return this.httpClient.get<any[]>(this.JSON_PLACEHOLDE_URL, { params: par });
  }
  
}
