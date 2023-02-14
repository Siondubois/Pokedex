import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../typings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://pokedex-c8855-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(private http: HttpClient) { }

  signIn(user: User) {
    return this.http.post(`${this.apiUrl}/users.json`, user);
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users.json`);
  }

}
