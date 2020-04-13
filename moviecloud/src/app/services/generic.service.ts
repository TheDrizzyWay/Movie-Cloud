import { Injectable } from '@angular/core';
import { Resource } from '@app/models/Resource';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T extends Resource> {
  
  constructor(
    private http: HttpClient,
    private url: string,
    private endpoint: string
    ) { }

    public create(item: T): Observable<T> {
      return this.http.post<any>(`${this.url}/${this.endpoint}`, item);
    }

    public get(): Observable<T> {
      return this.http.get<any>(`${this.url}/${this.endpoint}`);
    }

    public getOne(id: number): Observable<T> {
      return this.http.get<any>(`${this.url}/${this.endpoint}/${id}`);
    }
}
