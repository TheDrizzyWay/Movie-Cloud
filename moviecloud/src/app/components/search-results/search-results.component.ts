import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@app/models/Movie';
import { TvShow } from '@app/models/TvShow';
import { TopRatedService, UpcomingService, NowPlayingService, PopularService } from '@app/services/movies/movie.service';
import { TodayService, PopularTvService, OnAirService, TopRatedTvService } from '@app/services/tv/tv.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string;
  searchResults: Movie[] | TvShow[];
  page: number;

  constructor(
    private route: ActivatedRoute,
    private topRated: TopRatedService,
    private upcoming: UpcomingService,
    private nowPlaying: NowPlayingService,
    private popular: PopularService,
    private todayTv: TodayService,
    private popularTv: PopularTvService,
    private onAir: OnAirService,
    private topTv: TopRatedTvService
    ) { 
    this.searchResults = [];
    this.page = 1;
    this.searchTerm = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.searchTerm = res.get('id');
      this.handleSearch(this.searchTerm);
    });
  }

  handleSearch(id: string) {
    switch (id) {
      case 'top-rated-movies':
        this.topRated.get().subscribe(res => this.searchResults = res.results);
        break;

      case 'upcoming-movies':
        this.upcoming.get().subscribe(res => this.searchResults = res.results);
        break;

      case 'now-playing-movies':
        this.nowPlaying.get().subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-movies':
        this.popular.get().subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-tv-shows':
        break;
      default:
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
