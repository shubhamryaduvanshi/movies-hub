import { Injectable } from '@angular/core';
import { LoginCredentialsType } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(data: LoginCredentialsType) {
    return this._http.post("https://demo.credy.in/api/v1/usermodule/login/", data);
  }

}
