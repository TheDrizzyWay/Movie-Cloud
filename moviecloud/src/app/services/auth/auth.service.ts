import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestToken, GuestToken, SessionToken } from '@app/models/AuthResponses';
import { User } from '@app/models/User';

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

   getUserSession(token: string): Observable<SessionToken> {
     return this.http.post<any>(`${this.baseUrl}/session/new?api_key=${this.apiKey}`, { request_token: token });
   }

   getGuestSession(): Observable<GuestToken> {
    return this.http.get<any>(`${this.baseUrl}/guest_session/new?api_key=${this.apiKey}`);
   }

   getUserDetails(sessionId: string): Observable<User> {
     return this.http.get<any>(`https://api.themoviedb.org/3/account?api_key=${this.apiKey}&session_id=${sessionId}`);
   }

   deleteSession() {
     return window.localStorage.clear();
   }

   saveSession(sessionData: GuestToken | SessionToken): void {
    window.localStorage.setItem('session', JSON.stringify(sessionData));
   }

   getSession(): GuestToken | SessionToken {
    return JSON.parse(window.localStorage.getItem('session'));
   }

   saveUser(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user));
   }

   getUser(): User {
     return JSON.parse(window.localStorage.getItem('user'));
   }
}
