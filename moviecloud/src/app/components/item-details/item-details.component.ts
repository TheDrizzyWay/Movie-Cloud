import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tmdbConfig } from '@app/utils/constants';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  itemType: string;

  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.itemType = res.get('type');
      this.fetchData(res.get('id'), this.itemType);
    });
  }

  fetchData(id: string, itemType: string) {

  }

  styleBackground() {
    // return { 'background': `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff
    //                           url(${tmdbConfig.secure_base_url}original${this.itemType === 'people' ? `${this.props.location.state ? this.props.location.state.backdropUrl : `${this.props.peopleCombinedCredits.cast.length > 0 ? this.props.peopleCombinedCredits.cast[0].backdrop_path : ''}`}` : `${this.props.match.params.type === 'movie' ? this.props.movieDetails.backdrop_path : this.props.TVDetails.backdrop_path}`}` : ''})
    //                           center top no-repeat` };
  }

  handleShareButton(): void {
    document.querySelector('.item-details-header-info-share-buttons').classList.toggle('item-details-header-info-share-buttons__hide');
  }

}
