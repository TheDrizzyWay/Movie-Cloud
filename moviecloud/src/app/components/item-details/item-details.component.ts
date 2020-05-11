import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tmdbConfig } from '@app/utils/constants';
import { TrailerService, ReviewService } from '@app/services/movies/movie.service';
import { Details } from '@app/models/Details';
import { Credit } from '@app/models/Credit';
import { Trailer } from '@app/models/Trailer';
import { Review } from '@app/models/Review';
import { DiscoverService } from '@app/services/discover/discover.service';
import { PeopleDetails } from '@app/models/People';
import { CombinedCredit } from '@app/models/CombinedCredit';
import { AccountService } from '@app/services/account/account.service';
import { AuthService } from '@app/services/auth/auth.service';
import { GuestToken, SessionToken } from '@app/models/AuthResponses';
import { User } from '@app/models/User';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  itemType: string;
  sessionData: GuestToken | SessionToken;
  userDetails: User;
  details: Details;
  credits: Credit;
  trailers: Trailer;
  reviews: Review;
  combinedCredits: CombinedCredit;
  peopleDetails: PeopleDetails;
  tmdb: any = tmdbConfig;

  constructor(
    private route: ActivatedRoute,
    private trailerService: TrailerService,
    private reviewService: ReviewService,
    private discover: DiscoverService,
    private auth: AuthService,
    private account: AccountService
    ) { 
      this.sessionData = this.auth.getSession();
      this.userDetails = this.auth.getUser();
    }

  ngOnInit() {
    this.details = this.route.snapshot.data.details;
    this.credits = this.route.snapshot.data.credits;
    this.route.paramMap.subscribe(res => {
      this.itemType = res.get('type');
      this.fetchData(res.get('id'), this.itemType);
    });
  }

  fetchData(id: string, itemType: string) {
    if(itemType == 'people') {
      this.discover.getPeopleDetails(Number(id)).subscribe(res => this.peopleDetails = res);
      this.discover.getPeopleCombinedCredits(id).subscribe(res => this.combinedCredits = res);
    } else {
      this.trailerService.getOne(itemType, id).subscribe(res => this.trailers = res);
      this.reviewService.getOne(itemType, id).subscribe(res => this.reviews = res);
    }
  }

  // Takes a date of birth and reformats it to DAY / MONTH / YEAR
  formatYearOfBirth(date: string): string {
    return date.split('-').reverse().join(' / ');
  }

  // Takes a date of birth and returns age
  findAge(date: string): number {
    return new Date().getFullYear() - parseInt(date.split('-')[0], 10);
  }

  roundUp(popularity: number): number {
    return Math.round(popularity);
  }

  // Takes string and shortens it to 50 words
  shortText = (str: string, length = 50) => {
    const strArr = str.split(' ');
    return strArr.length < length ? str : strArr.filter((word, i) => i < length).join(' ') + '...';
  }

  handleFavoriteItem(target: EventTarget, itemId: string) {
    if(this.sessionData && this.sessionData.session_id) {
      const requestBody = {
        media_type: this.itemType,
        media_id: itemId,
        favorite: !(<SVGElement>target).closest('.item-details-header-info-container-content__favorite').classList.value.includes('--active')
      };

      this.account.setFavourite(this.userDetails.id, this.sessionData.session_id, requestBody).subscribe();
    } else {
      document.querySelector('.item-details-header-info-container-account-warning').classList.remove('item-details-header-info-container-account-warning--hide');
      setTimeout(() => {
        document.querySelector('.item-details-header-info-container-account-warning').classList.add('item-details-header-info-container-account-warning--hide');
      }, 3000);
    }
  }

  styleBackground() {
    let backdropUrl: string = '';

    if (this.itemType == 'people' && this.combinedCredits) {
      backdropUrl = this.combinedCredits.cast.length > 0 ? this.combinedCredits.cast[0].backdrop_path : '';
    } else {
      if(this.details) {
        backdropUrl = this.details.backdrop_path;
      }
    }

    return { 
      'background': `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
                        url(${this.tmdb.secure_base_url}original${backdropUrl}) center top no-repeat` 
    };
  }

  handleShareButton(): void {
    document.querySelector('.item-details-header-info-share-buttons').classList.toggle('item-details-header-info-share-buttons__hide');
  }

}
