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

  // Removes all active stars and sets new active stars up to where the user clicked
  activateStar(target: EventTarget) {
    const nodes = (<HTMLDivElement>target).closest(".star-rating-container__item").parentNode.childNodes as NodeListOf<HTMLElement>;

    nodes.forEach(node => {
      node.classList.remove("star-rating-container__item--active");
    });

    for (let node of nodes) {
      node.classList.toggle("star-rating-container__item--active");
      if ((<HTMLElement>target).closest(".star-rating-container__item") === node) {
        node.classList.toggle("star-rating-container__item__active");
        break;
      }
    }
  }

  postRating(target: EventTarget) {

    // if (logInStatus === 'GUEST') {
    //   this.activateStar(target);
    //   const rating = document.querySelectorAll('.star-rating-container__item__active').length * 2;

    //   if (itemType === 'movies') {
    //     this.props.rateMovie(`https://api.themoviedb.org/3/movie/${itemId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, rating);
    //   } else if (itemType === 'tv') {
    //     this.props.rateMovie(`https://api.themoviedb.org/3/tv/${itemId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, rating);
    //   }

    // } else if (logInStatus === 'APPROVED') {
    //   this.activateStar(target);
    //   const rating = document.querySelectorAll('.star-rating-container__item__active').length * 2;

    //     if (itemType === 'movies') {
    //       this.props.rateMovie(`https://api.themoviedb.org/3/movie/${itemId}/rating?api_key=${apiKey}&session_id=${sessionId}`, rating);
    //     } else if (itemType === 'tv') {
    //       this.props.rateMovie(`https://api.themoviedb.org/3/tv/${itemId}/rating?api_key=${apiKey}&session_id=${sessionId}`, rating);
    //     }

    //     // Activates popup telling user to sign in
    // } else {
    //   document.querySelector('.star-rating-container-warning').classList.remove('star-rating-container-warning--hide');
    //   setTimeout(() => {
    //     document.querySelector('.star-rating-container-warning').classList.add('star-rating-container-warning--hide');
    //   }, 3000);
    // }

  }

}
