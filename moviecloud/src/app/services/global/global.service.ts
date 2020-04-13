import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private movieGenreSubject = new Subject<any>();
  private tvGenreSubject = new Subject<any>();

  constructor() { }

  sendMovieGenres() {

  }

  sendTvGenres() {
    
  }
}
