import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Resource } from '@app/models/Resource';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GenericService<T extends Resource> {
  apiKey: string;
  baseUrl: string;
  fullUrl: string;

  constructor(
    private http: HttpClient,
    private endpoint: string,
  ) { 
    this.baseUrl = "https://api.themoviedb.org/3";
    this.apiKey = environment.apiKey;
    this.fullUrl = `${this.baseUrl}/${this.endpoint}?api_key=${this.apiKey}&language=en-US`
  }

    public get(page: number = 1): Observable<T> {
      return this.http.get<any>(`${this.fullUrl}&page=${page}`)
      .pipe(catchError(err => this.handleError(err)));
    }

    public getOne(id: number): Observable<T> {
      return this.http.get<any>(this.fullUrl);
    }

    private handleError(err: any): Observable<any> {
      console.log(err);
      return throwError(err);
    }
}
