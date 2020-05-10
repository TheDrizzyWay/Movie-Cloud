import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { GuestToken, SessionToken } from '@app/models/AuthResponses';
import { AccountService } from '@app/services/account/account.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemType: string;
  @Input() itemId: string;
  sessionData: GuestToken | SessionToken;;

  constructor(
    private auth: AuthService,
    private account: AccountService
    ) {
    this.sessionData = this.auth.getSession();
   }

  ngOnInit() {
    this.setRating(this.rating);
  }

  setRating(ratingValue: number): void {
    let ratingRounded = Math.round(ratingValue / 2);

    document.querySelectorAll('.star-rating-container__item').forEach((node, i) => {
      if (i < ratingRounded) {
        node.classList.add("star-rating-container__item--active");
      }
    });
  }

  // Removes all active stars and sets new active stars up to where the user clicked
  activateStar(target: EventTarget): void {
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
    if (this.sessionData) {
      const ratingValue = document.querySelectorAll('.star-rating-container__item__active').length * 2;

      if(this.sessionData.guest_session_id) {
        console.log('guest things');
        
        this.activateStar(target);
        this.account.guestRating(this.itemType, this.itemId, this.sessionData.guest_session_id, ratingValue).subscribe();
      } else {
        this.activateStar(target);
        this.account.userRating(this.itemType, this.itemId, this.sessionData.session_id, ratingValue).subscribe();
      }

    } else {
      // Activates popup telling user to sign in
      document.querySelector('.star-rating-container-warning').classList.remove('star-rating-container-warning--hide');
      setTimeout(() => {
        document.querySelector('.star-rating-container-warning').classList.add('star-rating-container-warning--hide');
      }, 3000);
    }
  }

}
