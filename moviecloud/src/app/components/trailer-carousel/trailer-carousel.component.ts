import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TrailerResult } from '@app/models/Trailer';

@Component({
  selector: 'app-trailer-carousel',
  templateUrl: './trailer-carousel.component.html',
  styleUrls: ['./trailer-carousel.component.scss']
})
export class TrailerCarouselComponent {
  @Input() trailers: TrailerResult[];

  config: SwiperConfigInterface;

  constructor(private sanitizer: DomSanitizer) { 
    this.config =  {
      init: true,
      slidesPerView: 3,
      loop: true,
      spaceBetween: 0,
      observer: true,
      centeredSlides: true,

      breakpoints: {
        1500: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 1,
        }
      },
      navigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      slideNextClass: '.swiper-button-next',
      slidePrevClass: '.swiper-button-prev',
    };
    
  }

  cleanUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
  }

}
