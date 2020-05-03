import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemTypeService } from '@app/services/item-type/item-type.service';
import { GlobalService } from '@app/services/global/global.service';
import { Genre } from '@app/models/Genre';
import { NowPlayingService, UpcomingService, PopularService, TopRatedService, OnAirService, TodayService } from '@app/services/movies/movie.service';
import { Movie } from '@app/models/Movie';
import { TvShow } from '@app/models/TvShow';

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
  nowPlayingList: Movie[];
  upcomingList: Movie[];
  popularList: Movie[] | TvShow[];
  topRatedList: Movie[] | TvShow[];
  todayTvList: Movie[] | TvShow[];
  popularTvList: Movie[] | TvShow[];
  onAirList: Movie[] | TvShow[];
  topTvList: Movie[] | TvShow[];

  constructor(
    private itemService: ItemTypeService,
    private globalService: GlobalService,
    private nowPlaying: NowPlayingService,
    private upcoming: UpcomingService,
    private popular: PopularService,
    private topRated: TopRatedService,
    private todayTv: TodayService,
    private onAir: OnAirService,
    ) { 
      this.nowPlayingList = [];
      this.upcomingList = [];
      this.popularList = [];
      this.topRatedList = [];
      this.todayTvList = [];
      this.popularTvList = [];
      this.onAirList = [];
      this.topTvList = [];
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
    this.nowPlaying.get('movie').subscribe(res => this.nowPlayingList = res.results);
    this.upcoming.get('movie').subscribe(res => this.upcomingList = res.results);
    this.popular.get('movie').subscribe(res => this.popularList = res.results);
    this.topRated.get('movie').subscribe(res => this.topRatedList = res.results);
    this.todayTv.get('tv').subscribe(res => this.todayTvList = res.results);
    this.popular.get('tv').subscribe(res => this.popularTvList = res.results);
    this.onAir.get('tv').subscribe(res => this.onAirList = res.results);
    this.topRated.get('tv').subscribe(res => this.topTvList = res.results);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.movieSubscription.unsubscribe();
    this.tvSubscription.unsubscribe();
  }

}
