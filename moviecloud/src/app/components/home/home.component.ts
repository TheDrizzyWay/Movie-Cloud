import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemTypeService } from '@app/services/item-type/item-type.service';
import { GlobalService } from '@app/services/global/global.service';
import { Genre } from '@app/models/Genre';
import { NowPlayingService } from '@app/services/movies/movie.service';
import { UpcomingMovie } from '@app/models/UpcomingMovie';
import { TodayService } from '@app/services/tv/tv.service';
import { TodayTv } from '@app/models/TodayTv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemType: string;
  movieGenres: Genre[];
  tvGenres: Genre[];
  movieSubscription: Subscription;
  tvSubscription: Subscription;
  nowPlayingList: UpcomingMovie[];
  todayTvList: TodayTv[];

  constructor(
    private itemService: ItemTypeService,
    private globalService: GlobalService,
    private nowPlaying: NowPlayingService,
    private todayTv: TodayService
    ) { 
      this.nowPlayingList = [];
      this.todayTvList = [];
    }

  ngOnInit() {
    this.itemType = this.itemService.getType();

    this.movieSubscription = this.globalService.getEntity('movie_genre').subscribe(res => {
        this.movieGenres = res.genres ? res.genres : [];
      });
  
    this.tvSubscription = this.globalService.getEntity('tv_genre').subscribe(res => {
      this.tvGenres = res.genres ? res.genres : [];
    });

    this.fetchContent();

  }

  itemToggle(type: string): void {
    this.itemType = this.itemService.setType(type);
  }

  fetchContent() {
    this.nowPlaying.get().subscribe(res => this.nowPlayingList = res.results);
    this.todayTv.get().subscribe(res => this.todayTvList = res.results);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.movieSubscription.unsubscribe();
    this.tvSubscription.unsubscribe();
  }

}
