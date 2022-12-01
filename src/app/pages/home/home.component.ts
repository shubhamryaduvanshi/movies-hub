import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesCollection: any = [];

  constructor(
    private _moviesService: MoviesService,
    public _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._moviesService.getMovies().subscribe((data) => {
      this.moviesCollection = data;
      console.log(data);
    })
  }

}
