import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { LoaderService } from 'src/app/core/loader.service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, observable, Observable, pluck, switchMap } from 'rxjs';

interface MoviesCollectionType {
  count: number;
  next: string | null;
  previous: string | null,
  results: MovieType[]
}

interface MovieType {
  title: string;
  description: string;
  genres?: string[] | null;
  uuid: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageEvent: PageEvent | undefined;
  moviesCollection: any = [];
  currentPageCount: number = 1;
  isErrorOccured: boolean = false;
  moviesCollectionTemp: any = [];
  showSearchContainer: boolean = false;
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private _moviesService: MoviesService,
    public _loaderService: LoaderService,
    private _formBuilder: FormBuilder
  ) {

    // Note: The below code is for search functionality
    // Thie required to be refactored and moved to a separate service and optimised
    this.searchForm.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      pluck('search'),
      filter((value: any) => value.length > 3),
      switchMap((value: string) => {
        const result = this.searchMovies(value);
        // @ts-ignore
        if (result.length > 0) {
          this.moviesCollectionTemp.results = result;
        } else {
          this.moviesCollectionTemp.results = [];
          this.moviesCollectionTemp.count = 0;
        }
        return result;
      })
    ).subscribe
      ((data: MovieType) => {
        console.log("data", data);
      },
        (err) => {
          console.log(err);
        }
      )
  }

  ngOnInit(): void {
    this.fetchMovies();
  }

  searchMovies(searchValue: string): Observable<any> {
    let filteredMovies = [];
    filteredMovies = this.moviesCollectionTemp.results.filter((movie: any) => {
      return movie.title.toLowerCase().includes(searchValue.toLowerCase());
    }
    );
    console.log("filter", filteredMovies);
    return filteredMovies;
  }

  onPaginateChange(event: any) {
    const isNext = event.previousPageIndex < event.pageIndex;
    if (isNext) {
      this.currentPageCount++;
      return this.fetchMovies(event.pageIndex + 1);
    }
    this.currentPageCount--;
    return this.fetchMovies(event.pageIndex + 1);
  }

  fetchMovies(page?: number) {
    if (page) {
      this._moviesService.getMovies(page).subscribe((data) => {
        this.moviesCollection = data;
        this.moviesCollectionTemp = data;
        this.isErrorOccured = false;
      }, (err) => {
        console.log(err);
        this.isErrorOccured = true;
      })
    } else {
      this._moviesService.getMovies().subscribe((data) => {
        this.moviesCollection = data;
        this.moviesCollectionTemp = data;
        this.isErrorOccured = false;
      },
        (err) => {
          console.log(err);
          this.isErrorOccured = true;
        })
    }

  }

  refetchMovies() {
    this.fetchMovies(this.currentPageCount);
  }

  resetSearch() {
    this.searchForm.reset();
    this.refetchMovies();
  }

  toggleSearchBar() {
    console.log("toggleSearchBar");
    this.showSearchContainer = !this.showSearchContainer;
  }



}
