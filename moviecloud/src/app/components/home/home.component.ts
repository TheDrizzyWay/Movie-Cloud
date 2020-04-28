import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemTypeService } from '@app/services/item-type/item-type.service';
import { GlobalService } from '@app/services/global/global.service';
import { Genre } from '@app/models/Genre';
import { NowPlayingService, UpcomingService, PopularService, TopRatedService } from '@app/services/movies/movie.service';
import { Movie } from '@app/models/Movie';
import { TodayService, PopularTvService, OnAirService, TopRatedTvService } from '@app/services/tv/tv.service';
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
  popularList: Movie[];
  topRatedList: Movie[];
  todayTvList: TvShow[];
  popularTvList: TvShow[];
  onAirList: TvShow[];
  topTvList: TvShow[];

  constructor(
    private itemService: ItemTypeService,
    private globalService: GlobalService,
    private nowPlaying: NowPlayingService,
    private upcoming: UpcomingService,
    private popular: PopularService,
    private topRated: TopRatedService,
    private todayTv: TodayService,
    private popularTv: PopularTvService,
    private onAir: OnAirService,
    private topTv: TopRatedTvService
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
    this.nowPlaying.get().subscribe(res => this.nowPlayingList = res.results);
    this.upcoming.get().subscribe(res => this.upcomingList = res.results);
    this.popular.get().subscribe(res => this.popularList = res.results);
    this.topRated.get().subscribe(res => this.topRatedList = res.results);
    this.todayTv.get().subscribe(res => this.todayTvList = res.results);
    this.popularTv.get().subscribe(res => this.popularTvList = res.results);
    this.onAir.get().subscribe(res => this.onAirList = res.results);
    this.topTv.get().subscribe(res => this.topTvList = res.results);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.movieSubscription.unsubscribe();
    this.tvSubscription.unsubscribe();
  }

}