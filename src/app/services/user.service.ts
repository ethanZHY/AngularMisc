import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginEvent } from '../models/app-models';
/**
 * @author Ethan Zhang
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  eventEmitter: EventEmitter<LoginEvent> = new EventEmitter();

  constructor() { }

  login(loginForm: FormGroup){}
}
