import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../typings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static IS_LOGGED_IN = 'isLoggedIn';

  private apiUrl = "https://pokedex-c8855-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(private http: HttpClient, private storageService: StorageService) { }

  signIn(user: User) {
    return this.http.post(`${this.apiUrl}/users.json`, user);
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users.json`);
  }

  storeIsLoggedIn(value: string) {
    this.storageService.setItem(AuthService.IS_LOGGED_IN, value);
  }
}
