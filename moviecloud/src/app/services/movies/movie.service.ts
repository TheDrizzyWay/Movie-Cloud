import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { MovieInterface } from '@app/models/Movie';
import { Details } from '@app/models/Details';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService extends GenericService<MovieInterface> {

  constructor(http: HttpClient) { 
    super(http, 'movie/upcoming');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PopularService extends GenericService<MovieInterface> {

  constructor(http: HttpClient) { 
    super(http, 'movie/popular');
  }
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService extends GenericService<MovieInterface> {

  constructor(http: HttpClient) { 
    super(http, 'movie/now_playing');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TopRatedService extends GenericService<MovieInterface> {

  constructor(http: HttpClient) { 
    super(http, 'movie/top_rated');
  }
}

@Injectable({
  providedIn: 'root'
})
export class DetailsService extends GenericService<Details> {

  constructor(http: HttpClient) { 
    super(http, 'movie/details');
  }
}

