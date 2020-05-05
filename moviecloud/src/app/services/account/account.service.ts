import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MovieInterface } from '@app/models/Movie';
import { TvShowInterface } from '@app/models/TvShow';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "https://api.themoviedb.org/3/account";
    this.apiKey = environment.apiKey;
  }

  getMovieFavorites(accountId: number, sessionId: string): Observable<MovieInterface> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}/favorite/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
  }

  getTvFavourites(accountId: number, sessionId: string): Observable<TvShowInterface> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}/favorite/tv?api_key=${this.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
  }

  getMoviesRated(accountId: number, sessionId: string): Observable<MovieInterface> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}/rated/movies?api_key=${this.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
  }

  getTvRated(accountId: number, sessionId: string): Observable<TvShowInterface> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}/rated/tv?api_key=${this.apiKey}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`);
  }

  setFavourite() {
    
  }
}
