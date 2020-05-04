import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tmdbConfig } from '@app/utils/constants';
import { DetailsService, CreditsService, TrailerService, ReviewService } from '@app/services/movies/movie.service';
import { Details } from '@app/models/Details';
import { Credit } from '@app/models/Credit';
import { Trailer } from '@app/models/Trailer';
import { Review } from '@app/models/Review';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  itemType: string;
  details: Details;
  credits: Credit;
  trailers: Trailer;
  reviews: Review;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private creditsService: CreditsService,
    private trailerService: TrailerService,
    private reviewService: ReviewService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.itemType = res.get('type');
      this.fetchData(res.get('id'), this.itemType);
    });
  }

  fetchData(id: string, itemType: string) {
    if(itemType == 'people') {
      //do people
    } else {
      this.detailsService.getOne(itemType, id).subscribe(res => this.details = res);
      this.creditsService.getOne(itemType, id).subscribe(res => this.credits = res);
      this.trailerService.getOne(itemType, id).subscribe(res => this.trailers = res);
      this.reviewService.getOne(itemType, id).subscribe(res => this.reviews = res);
    }
  }

  styleBackground() {
    let backdropUrl: string = '';
    if (this.itemType == 'people') {

    } else {

    }
    // return { 'background': `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
    //                           url(${tmdbConfig.secure_base_url}original${this.itemType === 'people' ? `${this.props.location.state ? this.props.location.state.backdropUrl : `${this.props.peopleCombinedCredits.cast.length > 0 ? this.props.peopleCombinedCredits.cast[0].backdrop_path : ''}`}` : `${this.props.match.params.type === 'movie' ? this.props.movieDetails.backdrop_path : this.props.TVDetails.backdrop_path}`}` : ''})
    //                           center top no-repeat` };
  }

  handleShareButton(): void {
    document.querySelector('.item-details-header-info-share-buttons').classList.toggle('item-details-header-info-share-buttons__hide');
  }

}
