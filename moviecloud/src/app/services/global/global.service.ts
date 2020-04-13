import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MovieGenreService, TvGenreService } from '../genres/genre.service';
import { Genre } from '@app/models/Genre';
import { ItemTypeService } from '../item-type/item-type.service';
import { UpcomingService, PopularService, NowPlayingService, TopRatedService } from '../movies/movie.service';
import { UpcomingMovie } from '@app/models/UpcomingMovie';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private movieGenreSubject: Subject<Genre>;
  private tvGenreSubject: Subject<Genre>;
  private itemTypeSubject: Subject<string>;
  private upcomingMovieSubject: Subject<UpcomingMovie>;

  constructor(
    private movieGenre: MovieGenreService,
    private tvGenre: TvGenreService,
    private typeService: ItemTypeService,
    private upcoming: UpcomingService,
    private popular: PopularService,
    private nowPlaying: NowPlayingService,
    private topRated: TopRatedService
    ) {
      this.movieGenreSubject = new Subject<Genre>();
      this.tvGenreSubject = new Subject<Genre>();
      this.itemTypeSubject = new Subject<string>();
      this.upcomingMovieSubject = new Subject<UpcomingMovie>();
     }

  sendItemType(type: string) {
    this.itemTypeSubject.next(this.typeService.setType(type));
  }

  sendMovieGenres() {
    this.movieGenre.get().subscribe(res => this.movieGenreSubject.next(res));
  }

  sendTvGenres() {
    this.tvGenre.get().subscribe(res => this.tvGenreSubject.next(res));
  }

  sendUpcomingMovies() {
    this.upcoming.get().subscribe(res => this.upcomingMovieSubject.next(res));
  }

  getItemType(): Observable<string> {
    return this.itemTypeSubject.asObservable();
  }

  getMovieGenres(): Observable<any> {
    return this.movieGenreSubject.asObservable();
  }

  getTvGenres(): Observable<any> {
    return this.tvGenreSubject.asObservable();
  }
}
