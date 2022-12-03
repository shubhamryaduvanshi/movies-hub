import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  description: string;
  genres: string[];
  poster: string;
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent implements OnInit {

  movie: any;
  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.movie = data;
  }

  ngOnInit(): void {


    this.movie.genres = this.isNoneEmpty(this.movie.genres) ? this.movie.genres : [];
    console.log(this.movie.genres);
  }

  isNoneEmpty(arr: string[]) {
    return arr.indexOf("") === -1;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

