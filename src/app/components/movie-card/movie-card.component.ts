import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;
  constructor(public _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getGenreArray(genre: any) {
    return genre?.split(',');
  }

  getShortText(text: string, limit: number) {
    if (text.length > limit) {
      return text.substr(0, limit) + '...';
    }
    return text;
  }

  getImageFromTitle(title: string) {
    const text = title.replace(/\s/g, '+');
    return `https://ui-avatars.com/api/?name=${text}&background=f0f8ff&color=3069b2&size=256`;
  }

  openMovieDialog() {
    const movieInfo = {
      title: this.movie.title,
      description: this.movie.description,
      genres: this.getGenreArray(this.movie.genres),
      poster: this.getImageFromTitle(this.movie.title)
    }
    
    this._dialog.open(MovieDialogComponent, {
      data: movieInfo,
      disableClose: true,
      
    });
  }


}
