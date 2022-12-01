import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _http: HttpClient,
    private _loginService: LoginService) { }

  getMovies() {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `${this._loginService.getToken()}`
    }

    return this._http.get("https://demo.credy.in/api/v1/maya/movies/", { headers: header });
  }
}
