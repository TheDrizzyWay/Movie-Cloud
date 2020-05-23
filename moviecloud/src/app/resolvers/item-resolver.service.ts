import { Injectable } from '@angular/core';
import { ResolverService } from './resolver.service';
import { Details } from '@app/models/Details';
import { DetailsService, CreditsService, TrailerService, ReviewService } from '@app/services/movies/movie.service';
import { Credit } from '@app/models/Credit';
import { Trailer } from '@app/models/Trailer';
import { Review } from '@app/models/Review';

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

@Injectable({
  providedIn: 'root'
})
export class TrailersResolver extends ResolverService<Trailer, TrailerService> {

  constructor(itemService: TrailerService) {
    super(itemService);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsResolver extends ResolverService<Review, ReviewService> {

  constructor(itemService: ReviewService) {
    super(itemService);
  }
}
