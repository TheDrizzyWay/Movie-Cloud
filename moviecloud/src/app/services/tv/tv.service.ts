import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { TvShowInterface } from '@app/models/TvShow';

@Injectable({
  providedIn: 'root'
})
export class TodayService extends GenericService<TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'tv/airing_today');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PopularTvService extends GenericService<TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'tv/popular');
  }
}

@Injectable({
  providedIn: 'root'
})
export class OnAirService extends GenericService<TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'tv/on_the_air');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TopRatedTvService extends GenericService<TvShowInterface> {

  constructor(http: HttpClient) { 
    super(http, 'tv/top_rated');
  }
}
