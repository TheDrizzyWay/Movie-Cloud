import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MovieGenreService, TvGenreService } from '../genres/genre.service';
import { Genre } from '@app/models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private movieGenreSubject = new Subject<Genre>();
  private tvGenreSubject = new Subject<any>();

  constructor(
    private movieGenre: MovieGenreService,
    private tvGenre: TvGenreService
    ) { }

  sendMovieGenres() {
    this.movieGenre.get().subscribe(res => this.movieGenreSubject.next(res));
  }

  sendTvGenres() {
    this.tvGenre.get().subscribe(res => this.tvGenreSubject.next(res));
  }

  getMovieGenres(): Observable<any> {
    return this.movieGenreSubject.asObservable();
  }

  getTvGenres(): Observable<any> {
    return this.tvGenreSubject.asObservable();
  }
}
