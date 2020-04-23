import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  get(page: number, options: any): Observable<any> {
    return this.http.get<any>(`${this.discoverUrl}/movie?api_key=${this.apiKey}`);
  }
}
