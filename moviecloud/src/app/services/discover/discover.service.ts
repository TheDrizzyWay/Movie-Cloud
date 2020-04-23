import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Movie } from '@app/models/Movie';
import { DiscoverOptions } from '@app/models/DiscoverOptions';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  apiKey: string;
  discoverUrl: string;

  constructor(private http: HttpClient) { 
    this.apiKey = environment.apiKey;
    this.discoverUrl = 'https://api.themoviedb.org/3/discover';
  }

  get(page: number, options: DiscoverOptions): Observable<Movie[]> {
    return this.http.get<any>(`${this.discoverUrl}/movie?api_key=${this.apiKey}&language=en-US&sort_by=${options.sortBy}&include_adult=false&include_video=false&page=${page}&${options.voteAverage ? `vote_average.gte=${options.voteAverage}&` : ''}${options.withGenres ? `with_genres=${options.withGenres}&` : ''}${options.withPeople ? `with_people=${options.withPeople}&` : ''}${options.year ? `year=${options.year}` : ''}`)
      .pipe(map(res => res.results));
  }
}
