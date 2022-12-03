import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _http: HttpClient,
    private _loginService: LoginService) { }

  getMovies(pointer?: number) {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `${this._loginService.getToken()}`
    }
    let baseUrl = 'https://demo.credy.in/api/v1/maya/movies/';
    if (pointer) {
      baseUrl = baseUrl + `?page=${pointer}`;
    }
    return this._http.get(baseUrl, { headers: header });
  }

  getGenreArray(genre: any) {
    return genre.split(',');
  }

  getShortText(text: string, limit: number) {
    if (text.length > limit) {
      return text.substr(0, limit) + '...';
    }
    return text;
  }

  getImageFromTitle(title: string) {
    const text = title.replace(/\s/g, '+');
    return `https://ui-avatars.com/api/?name=${text}&background=5186cb&color=fff&size=256`;
  }

}
