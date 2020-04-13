import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { Genre } from '@app/models/Genre';

@Injectable({
  providedIn: 'root'
})
export class MovieGenreService extends GenericService<Genre> {

  constructor(http: HttpClient) { 
    super(http, 'genre/movie/list');
  }
}


@Injectable({
  providedIn: 'root'
})
export class TvGenreService extends GenericService<Genre> {

  constructor(http: HttpClient) { 
    super(http, 'genre/tv/list');
  }
}