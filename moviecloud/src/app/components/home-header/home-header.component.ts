import { Component, OnInit, OnDestroy } from '@angular/core';
import { Genre } from '@app/models/Genre';
import { Subscription } from 'rxjs';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit, OnDestroy {
  itemType: string;
  genres: Genre[];
  movieSubscription: Subscription;
  tvSubscription: Subscription;
  
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.movieSubscription = this.globalService.getMovieGenres().subscribe(res => {
      this.genres = res.genres ? res.genres : [];
    });

    this.tvSubscription = this.globalService.getTvGenres().subscribe(res => {
      this.genres = res.genres ? res.genres : [];
    });

    this.globalService.getItemType().subscribe(res => {
      if (res) {
        this.itemType = res;
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.movieSubscription.unsubscribe();
    this.tvSubscription.unsubscribe();
  }

}
