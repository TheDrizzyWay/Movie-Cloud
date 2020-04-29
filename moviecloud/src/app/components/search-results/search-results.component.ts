import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@app/models/Movie';
import { TvShow } from '@app/models/TvShow';
import { TopRatedService, UpcomingService, NowPlayingService, PopularService } from '@app/services/movies/movie.service';
import { TodayService, PopularTvService, OnAirService, TopRatedTvService } from '@app/services/tv/tv.service';
import { DiscoverService } from '@app/services/discover/discover.service';
import { People } from '@app/models/People';
import { tmdbConfig } from '@app/utils/constants';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string;
  searchResults: Movie[] | TvShow[] | People[];
  page: number;
  tmdb: object = tmdbConfig;

  constructor(
    private route: ActivatedRoute,
    private topRated: TopRatedService,
    private upcoming: UpcomingService,
    private nowPlaying: NowPlayingService,
    private popular: PopularService,
    private todayTv: TodayService,
    private popularTv: PopularTvService,
    private onAir: OnAirService,
    private topTv: TopRatedTvService,
    private discover: DiscoverService
    ) { 
    this.searchResults = [];
    this.page = 1;
    this.searchTerm = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.searchTerm = res.get('id');
      this.handleSearch(this.searchTerm, this.page);
    });
  }

  handleSearch(searchTerm: string, page: number) {
    switch (searchTerm) {
      case 'top-rated-movies':
        this.topRated.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'upcoming-movies':
        this.upcoming.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'now-playing-movies':
        this.nowPlaying.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-movies':
        this.popular.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-tv-shows':
        this.popularTv.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'top-rated-tv-shows':
        this.topTv.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'on-the-air-tv-shows':
        this.onAir.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'airing-today-tv-shows':
        this.todayTv.get(page).subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-people':
        this.discover.getPopularPeople(page).subscribe(res => this.searchResults = res);
        break;

      default:
        this.discover.search(searchTerm, page).subscribe(res => this.searchResults = res.results);
        break;
    }
  }

  parseSearchStr(searchTerm: string): string {
    return searchTerm.split('-').map((item, index) => index === 0 ? item.split('').map((letter, index) => index === 0 ? letter.toUpperCase() : letter).join('') : item).join(' ');
  }

  getNextPage() {
    this.page = this.page + 1;
    this.handleSearch(this.searchTerm, this.page);
  }

  getPreviousPage() {
    this.page = this.page - 1;
    this.handleSearch(this.searchTerm, this.page);
  }

}
