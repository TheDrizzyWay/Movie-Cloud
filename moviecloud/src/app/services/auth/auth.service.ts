import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestToken, GuestToken } from '@app/models/AuthResponses';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "https://api.themoviedb.org/3/authentication";
    this.apiKey = environment.apiKey;
   }

   getRequestToken(): Observable<RequestToken> {
    return this.http.get<any>(`${this.baseUrl}/token/new?api_key=${this.apiKey}`);
   }

   getGuestSession(): Observable<GuestToken> {
    return this.http.get<any>(`${this.baseUrl}/guest_session/new?api_key=${this.apiKey}`);
   }
}
