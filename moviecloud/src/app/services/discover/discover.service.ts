import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Movie } from '@app/models/Movie';
import { DiscoverOptions } from '@app/models/DiscoverOptions';
import { People, PeopleDetails } from '@app/models/People';
import { CombinedCredit } from '@app/models/CombinedCredit';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  apiKey: string;

  constructor(private http: HttpClient) { 
    this.apiKey = environment.apiKey;
  }

  get(page: number, options: DiscoverOptions): Observable<Movie[]> {
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=${options.sortBy}&include_adult=false&include_video=false&page=${page}&${options.voteAverage ? `vote_average.gte=${options.voteAverage}&` : ''}${options.withGenres ? `with_genres=${options.withGenres}&` : ''}${options.withPeople ? `with_people=${options.withPeople}&` : ''}${options.year ? `year=${options.year}` : ''}`)
      .pipe(map(res => res.results));
  }

  search(searchTerm: string, page: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`);
  }

  getPopularPeople(page: number): Observable<People[]> {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}&language=en-US&page=${page}`)
    .pipe(map(res => res.results));
  }

  getPeopleDetails(id: string): Observable<PeopleDetails> {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}?api_key=${this.apiKey}&language=en-US`);
  }

  getPeopleCombinedCredits(id: string): Observable<CombinedCredit> {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${this.apiKey}&language=en-US`);
  }

}
