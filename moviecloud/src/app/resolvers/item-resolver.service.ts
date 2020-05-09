import { Injectable } from '@angular/core';
import { ResolverService } from './resolver.service';
import { Details } from '@app/models/Details';
import { DetailsService, CreditsService } from '@app/services/movies/movie.service';
import { Credit } from '@app/models/Credit';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver extends ResolverService<Details, DetailsService> {

  constructor(itemService: DetailsService) {
    super(itemService);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CreditsResolver extends ResolverService<Credit, CreditsService> {

  constructor(itemService: CreditsService) {
    super(itemService);
  }
}