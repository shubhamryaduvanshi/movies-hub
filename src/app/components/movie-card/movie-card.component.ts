import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;
  constructor() { }

  posterUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png"
  ngOnInit(): void {
  }

  getGenreArray(genre: any) {
    return genre.split(',');
  }

  getShortText(text: string, limit: number) {
    if(text.length > limit) {
    return text.substr(0, limit) + '...';
    }
    return text;
  }


}
