import { Injectable } from '@angular/core';
import { ResolverService } from './resolver.service';
import { Details } from '@app/models/Details';
import { DetailsService } from '@app/services/movies/movie.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver extends ResolverService<Details, DetailsService> {

  constructor(http: HttpClient) {
    super(new DetailsService(http));
  }
}
