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
  url: string;

  constructor(
    private http: HttpClient,
    private endpoint: string,
  ) { 
    this.url = "https://api.themoviedb.org/3";
    this.apiKey = environment.apiKey;
  }

    public create(item: T): Observable<T> {
      return this.http.post<any>(`${this.url}/${this.endpoint}`, item);
    }

    public get(): Observable<T> {
      return this.http.get<any>(`${this.url}/${this.endpoint}?api_key=${this.apiKey}&language=en-US`)
      .pipe(catchError(err => this.handleError(err)));
    }

    public getOne(id: number): Observable<T> {
      return this.http.get<any>(`${this.url}/${this.endpoint}/${id}?api_key=${this.apiKey}&language=en-US`);
    }

    private handleError(err: any): Observable<any> {
      console.log(err);
      return throwError(err);
    }
}
