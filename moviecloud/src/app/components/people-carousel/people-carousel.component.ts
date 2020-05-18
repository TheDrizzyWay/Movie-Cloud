import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { tmdbConfig } from '@app/utils/constants';
import { Cast } from '@app/models/Credit';

@Component({
  selector: 'app-people-carousel',
  templateUrl: './people-carousel.component.html',
  styleUrls: ['./people-carousel.component.scss']
})
export class PeopleCarouselComponent implements OnInit {
  @Input() cast: Cast[];

  config: SwiperConfigInterface;
  slides: Cast[];
  tmdb: any = tmdbConfig;

  constructor() {
    this.config = {
      slidesPerView: 5,
      loop: true,
      spaceBetween: 30,
      observer: true,
      breakpoints: {
        768: {
          slidesPerView: 5
        },
        640: {
          slidesPerView: 3
        },
      },
      navigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      slideNextClass: '.swiper-button-next',
      slidePrevClass: '.swiper-button-prev'
    };

    this.slides = [];
   }

  ngOnInit() {
    this.selectSlides(this.cast);
  }

  selectSlides(slidesArray: Cast[]): void {
    slidesArray.forEach((item, index) => {
      if (index <= 10) {
        this.slides.push(item);
      }
    });
  }

}
