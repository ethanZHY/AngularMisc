import { Injectable, EventEmitter } from '@angular/core';
import { LoginEvent, LoginUser, SignUpUser } from '../models/app-models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.httpClient.post<any>('/api/login', loginUser);
  }

  logout() {
    localStorage.removeItem(JWT_AUTH_TOKEN);
    this.router.navigateByUrl('/login');
  }
  
  register(user: SignUpUser) {
    return this.httpClient.post<any>('/api/register', user);
  }

  getAllUsers() {
    return this.httpClient.get<any[]>(this.JSON_PLACEHOLDE_URL).pipe(
      map(users => {
        const usernames = [];
        users.forEach( u => usernames.push({username: u.username}));
        return usernames;
      }),
      tap(users => console.log(users))
    );
  }

  getUserByUsername(username: string) {
    return this.httpClient.get<any[]>(`${this.JSON_PLACEHOLDE_URL}?username=${username}`);
  }
  
}
