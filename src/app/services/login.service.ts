import { Injectable } from '@angular/core';
import { LoginCredentialsType } from '../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient,
    private _router: Router) { }


  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  login(data: LoginCredentialsType) {
    return this._http.post("https://demo.credy.in/api/v1/usermodule/login/", data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
