import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { User, UserList, UserWithFireBaseId } from '../typings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static IS_LOGGED_IN = 'isLoggedIn';
  private apiUrl = "https://pokedex-c8855-default-rtdb.europe-west1.firebasedatabase.app";
  
  private _isLoggedIn = false;
  public get isLoggedIn() {
    return this._isLoggedIn;
  }
  
  constructor(private http: HttpClient, private storageService: StorageService) { 
    this.loadLoggedInFromStorage();
  }

  loadLoggedInFromStorage() {
    const isLoggedInStr = this.storageService.getItem(AuthService.IS_LOGGED_IN);
    this._isLoggedIn = isLoggedInStr ? JSON.parse(isLoggedInStr) : false;
  }

  signIn(user: User) {
    return this.http.post(`${this.apiUrl}/users.json`, user);
  }

  login() {
    this._isLoggedIn = true;
    this.storeIsLoggedIn(this._isLoggedIn);
  }

  logout() {
    this._isLoggedIn = false;
    this.storeIsLoggedIn(this._isLoggedIn);
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users.json`)
      .pipe(
        map(
          (data) => {
            const users: UserWithFireBaseId[] = []; 
            Object.entries(data).forEach(([id, user])=>{
              users.push({
                ...user,
                id,
              });
            });
            return users;
          }
        )
      );
  }

  isUserInDB(data: any, email: string, password: string) {

    let userFound = false;

    data.forEach((element: any) => {
      if (element.email === email && element.password === password) {
        userFound=true;
      } 
    });

    return userFound;
  }

  storeIsLoggedIn(value: boolean) {
    this.storageService.setItem(AuthService.IS_LOGGED_IN, JSON.stringify(value));
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
        resolve(this._isLoggedIn);
    });
  }
}
