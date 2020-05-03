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
  parameter: string;
  resource: string;

  constructor(
    private http: HttpClient,
    private endpoint: string,
  ) { 
    this.baseUrl = "https://api.themoviedb.org/3";
    this.apiKey = environment.apiKey;
    this.fullUrl = `${this.baseUrl}/${this.endpoint}`;
  }

    public get(itemType: string, page: number = 1): Observable<T> {
      return this.http.get<any>(`${this.baseUrl}/${itemType}/${this.endpoint}?api_key=${this.apiKey}&language=en-US&page=${page}`)
        .pipe(catchError(err => this.handleError(err)));
    }

    public getGenres() {
      return this.http.get<any>(`${this.fullUrl}?api_key=${this.apiKey}&language=en-US`)
        .pipe(catchError(err => this.handleError(err)));
    }

    // public getOne(id: string): Observable<T> {
    //   this.resource = this.endpoint.split('/')[0];
    //   this.parameter = this.endpoint.split('/')[1] === 'details' ? '' : `/${this.endpoint.split('/')[1]}`;
    //   return this.http.get<any>(`${this.baseUrl}/${this.resource}/${id}${this.parameter}?api_key=${this.apiKey}&language=en-US`);
    // }

    private handleError(err: any): Observable<any> {
      console.log(err);
      return throwError(err);
    }
}
