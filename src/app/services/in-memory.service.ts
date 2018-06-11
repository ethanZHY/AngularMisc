import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      {email:'admin@gmail.com', username: 'admin', password: 'qweasd123'}
    ];
    return {users};
  }
}
