import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemType: string;
  @Input() itemId: string;

  constructor() { }

  ngOnInit() {
    console.log(this.rating);
    
    this.setRating(this.rating);
  }

  setRating(ratingValue: number) {
    let ratingRounded = Math.round(ratingValue / 2);

    document.querySelectorAll('.star-rating-container__item').forEach((node, i) => {
      if (i < ratingRounded) {
        node.classList.add("star-rating-container__item--active");
      }
    });
  }

}
