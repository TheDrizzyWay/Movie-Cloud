import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '@app/models/Movie';
import { TvShow } from '@app/models/TvShow';
import { TopRatedService, UpcomingService, NowPlayingService, PopularService, OnAirService, TodayService } from '@app/services/movies/movie.service';
import { DiscoverService } from '@app/services/discover/discover.service';
import { People } from '@app/models/People';
import { tmdbConfig } from '@app/utils/constants';
import { Genre } from '@app/models/Genre';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchTerm: string;
  searchResults: Movie[] | TvShow[] | People[];
  page: number;
  movieSubscription: Subscription;
  tvSubscription: Subscription;
  movieGenres: Genre[];
  tvGenres: Genre[];
  tmdb: any = tmdbConfig;

  constructor(
    private route: ActivatedRoute,
    private topRated: TopRatedService,
    private upcoming: UpcomingService,
    private nowPlaying: NowPlayingService,
    private popular: PopularService,
    private todayTv: TodayService,
    private onAir: OnAirService,
    private discover: DiscoverService,
    private global: GlobalService
    ) { 
    this.searchResults = [];
    this.page = 1;
    this.searchTerm = '';
  }

  ngOnInit() {
    this.movieSubscription = this.global.getEntity('movie_genre').subscribe(res => {
      this.movieGenres = res.genres ? res.genres : [];
    });
  
    this.tvSubscription = this.global.getEntity('tv_genre').subscribe(res => {
      this.tvGenres = res.genres ? res.genres : [];
    });

    this.route.paramMap.subscribe(res => {
      this.searchTerm = res.get('id');
      this.handleSearch(this.searchTerm, this.page);
    });

  }

  handleSearch(searchTerm: string, page: number) {
    switch (searchTerm) {
      case 'top-rated-movies':
        this.topRated.get('movie', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'upcoming-movies':
        this.upcoming.get('movie', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'now-playing-movies':
        this.nowPlaying.get('movie', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-movies':
        this.popular.get('movie', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-tv-shows':
        this.popular.get('tv', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'top-rated-tv-shows':
        this.topRated.get('tv', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'on-the-air-tv-shows':
        this.onAir.get('tv', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'airing-today-tv-shows':
        this.todayTv.get('tv', page).subscribe(res => this.searchResults = res.results);
        break;

      case 'popular-people':
        this.discover.getPopularPeople(page).subscribe(res => this.searchResults = res);
        break;

      default:
        this.discover.search(searchTerm, page).subscribe(res => this.searchResults = res.results);
        break;
    }
    window.scrollTo(0, 0);
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

  handleGenres(itemType: string, genreIds: number[]): object {
    const genreList = itemType == 'movie' ? this.movieGenres : this.tvGenres;
    if (genreList) {
      let genresArr = genreList.filter(genre => parseInt(genre.id, 10) == genreIds[0] || parseInt(genre.id, 10) == genreIds[1] ? genre.name : null);
      return { 
        name1: genresArr[0] ? genresArr[0].name : '',
        name2: genresArr[1] ? ` / ` + genresArr[1].name : ''
      };
    } else {
      return { name1: '', name2: '' };
    }
  }

  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
    this.tvSubscription.unsubscribe();
  }

}
