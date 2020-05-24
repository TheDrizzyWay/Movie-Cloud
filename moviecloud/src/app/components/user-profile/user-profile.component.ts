import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { GuestToken, SessionToken } from '@app/models/AuthResponses';
import { User } from '@app/models/User';
import { AccountService } from '@app/services/account/account.service';
import { Movie } from '@app/models/Movie';
import { TvShow } from '@app/models/TvShow';
import { tmdbConfig } from '@app/utils/constants';
import { GlobalService } from '@app/services/global/global.service';
import { Genre } from '@app/models/Genre';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  status: string;
  requestToken: string;
  sessionData: GuestToken | SessionToken;
  userDetails: User;
  favoriteMovies: Movie[];
  favoriteShows: TvShow[] | Movie[];
  ratedMovies: Movie[];
  ratedShows: TvShow[] | Movie[];
  movieSubscription: Subscription;
  tvSubscription: Subscription;
  movieGenres: Genre[];
  tvGenres: Genre[];
  tmdb: any = tmdbConfig;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private account: AccountService,
    private global: GlobalService
    ) { 
    this.status = this.route.snapshot.paramMap.get('status');
    this.requestToken = this.route.snapshot.queryParams['request_token'];
    this.sessionData = this.auth.getSession();
    this.userDetails = this.auth.getUser();
    this.favoriteMovies = [];
    this.favoriteShows = [];
    this.ratedMovies = [];
    this.ratedShows = [];
  }

  ngOnInit() {
    if(this.status == 'approved') {
      if(!this.sessionData) {
        this.auth.getUserSession(this.requestToken).subscribe(res => {
          if(res.success) {
            this.auth.saveSession(res);
            this.sessionData = res;

            this.auth.getUserDetails(this.sessionData.session_id).subscribe(res => {
              if(res.id) {
                this.auth.saveUser(res);
                this.userDetails = res;
                this.handleFavorites();
                this.handleRated();
              }
            });
          }
        });
      } else {
        this.handleFavorites();
        this.handleRated();
      }
    }

    this.movieSubscription = this.global.getEntity('movie_genre').subscribe(res => {
      this.movieGenres = res.genres ? res.genres : [];
    });
  
    this.tvSubscription = this.global.getEntity('tv_genre').subscribe(res => {
      this.tvGenres = res.genres ? res.genres : [];
    });
    
  }

  deleteSession(): void {
    if(this.sessionData) {
      this.auth.deleteSession();
      this.router.navigate(['']);
    }
  }

  handleFavorites() {
    this.account.getMovieFavorites(this.userDetails.id, this.sessionData.session_id).subscribe(res => {
      this.favoriteMovies = res.results;
    });

    this.account.getTvFavourites(this.userDetails.id, this.sessionData.session_id).subscribe(res => {
      this.favoriteShows = res.results;
    });
  }

  handleRated() {
    this.account.getMoviesRated(this.userDetails.id, this.sessionData.session_id).subscribe(res => {
      this.ratedMovies = res.results;
    });

    this.account.getTvRated(this.userDetails.id, this.sessionData.session_id).subscribe(res => {
      this.ratedShows = res.results;
    });
  }

  handleGenres(genreIds: number[], itemType: string): object {
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
    // unsubscribe to ensure no memory leaks
    this.movieSubscription.unsubscribe();
    this.tvSubscription.unsubscribe();
  }

}
