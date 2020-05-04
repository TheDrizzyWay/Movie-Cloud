import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { MovieInterface } from '@app/models/Movie';
import { TvShowInterface } from '@app/models/TvShow';
import { Details } from '@app/models/Details';
import { Credit } from '@app/models/Credit';
import { Trailer } from '@app/models/Trailer';
import { Review } from '@app/models/Review';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService extends GenericService<MovieInterface> {

  constructor(http: HttpClient) { 
    super(http, 'upcoming');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PopularService extends GenericService<MovieInterface | TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'popular');
  }
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService extends GenericService<MovieInterface> {

  constructor(http: HttpClient) { 
    super(http, 'now_playing');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TopRatedService extends GenericService<MovieInterface | TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'top_rated');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodayService extends GenericService<TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'airing_today');
  }
}

@Injectable({
  providedIn: 'root'
})
export class OnAirService extends GenericService<TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'on_the_air');
  }
}

@Injectable({
  providedIn: 'root'
})
export class DetailsService extends GenericService<Details> {

  constructor(http: HttpClient) { 
    super(http, 'details');
  }
}

@Injectable({
  providedIn: 'root'
})
export class CreditsService extends GenericService<Credit> {

  constructor(http: HttpClient) { 
    super(http, 'credits');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TrailerService extends GenericService<Trailer> {

  constructor(http: HttpClient) { 
    super(http, 'videos');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends GenericService<Review> {

  constructor(http: HttpClient) { 
    super(http, 'reviews');
  }
}
