import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MovieGenreService, TvGenreService } from '../genres/genre.service';
import { Genre } from '@app/models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private movieGenreSubject: Subject<Genre>;
  private tvGenreSubject: Subject<Genre>;
  private serviceConstants: Object;
  private subjectConstants: Object;

  constructor(
    private movieGenre: MovieGenreService,
    private tvGenre: TvGenreService,
    ) {
      this.movieGenreSubject = new Subject<Genre>();
      this.tvGenreSubject = new Subject<Genre>();

      this.serviceConstants = Object.freeze({ 
        movie_genre: this.movieGenre,
        tv_genre: this.tvGenre
       });

      this.subjectConstants = Object.freeze({ 
        movie_genre: this.movieGenreSubject,
        tv_genre: this.tvGenreSubject
       });
    }

  sendEntity(entity: string) {
    const entityService = this.serviceConstants[entity];
    const entitySubject = this.subjectConstants[entity];

    entityService.getGenres().subscribe(res => entitySubject.next(res));
  }

  getEntity(entity: string): Observable<any> {
    return this.subjectConstants[entity].asObservable();
  }

}
