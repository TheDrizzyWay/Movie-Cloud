import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { GuestToken, SessionToken } from '@app/models/AuthResponses';
import { User } from '@app/models/User';
import { AccountService } from '@app/services/account/account.service';
import { Movie } from '@app/models/Movie';
import { TvShow } from '@app/models/TvShow';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  status: string;
  requestToken: string;
  sessionData: GuestToken | SessionToken;
  userDetails: User;
  favoriteMovies: Movie[];
  favoriteShows: TvShow[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private account: AccountService
    ) { 
    this.status = this.route.snapshot.paramMap.get('status');
    this.requestToken = this.route.snapshot.queryParams['request_token'];
    this.sessionData = this.auth.getSession();
    this.userDetails = this.auth.getUser();
    this.favoriteMovies = [];
    this.favoriteShows = [];
  }

  ngOnInit() {
    if(this.status == 'approved' && !this.sessionData) {
      this.auth.getUserSession(this.requestToken).subscribe(res => {
        if(res.success) {
          this.auth.saveSession(res);
          this.sessionData = res;
        }

        if(this.sessionData && this.sessionData.session_id && !this.userDetails) {
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
    }
    
  }

  deleteSession(): void {
    if(this.sessionData.session_id) {
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

  }

}
