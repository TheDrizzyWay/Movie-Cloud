import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { UpcomingMovie } from '@app/models/UpcomingMovie';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService extends GenericService<UpcomingMovie> {

  constructor(http: HttpClient) { 
    super(http, 'movie/upcoming');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PopularService extends GenericService<any> {

  constructor(http: HttpClient) { 
    super(http, 'movie/popular');
  }
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService extends GenericService<any> {

  constructor(http: HttpClient) { 
    super(http, 'movie/now_playing');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TopRatedService extends GenericService<any> {

  constructor(http: HttpClient) { 
    super(http, 'movie/top_rated');
  }
}
