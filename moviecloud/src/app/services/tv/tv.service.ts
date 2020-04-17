import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { HttpClient } from '@angular/common/http';
import { TodayTvInterface } from '@app/models/TodayTv';

@Injectable({
  providedIn: 'root'
})
export class TodayService extends GenericService<TodayTvInterface> {

  constructor(http: HttpClient) { 
    super(http, 'tv/airing_today');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PopularService extends GenericService<any> {

  constructor(http: HttpClient) { 
    super(http, 'tv/popular');
  }
}

@Injectable({
  providedIn: 'root'
})
export class OnAirService extends GenericService<any> {

  constructor(http: HttpClient) { 
    super(http, 'tv/on_the_air');
  }
}

@Injectable({
  providedIn: 'root'
})
export class TopRatedService extends GenericService<any> {

  constructor(http: HttpClient) { 
    super(http, 'tv/top_rated');
  }
}
