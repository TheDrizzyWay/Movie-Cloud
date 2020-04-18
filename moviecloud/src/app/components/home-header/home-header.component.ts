import { Component, Input, OnChanges } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Genre } from '@app/models/Genre';
import { UpcomingMovie } from '@app/models/UpcomingMovie';
import { tmdbConfig } from '@app/utils/constants';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnChanges {
  @Input() itemType: string;
  @Input() genres: Genre[];
  @Input() items: UpcomingMovie[];

  config: SwiperConfigInterface;
  linkStyles: object;
  slides: UpcomingMovie[];
  
  constructor() { 
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      observer: true,

      autoplay: 8000,

      pagination: '.home-swiper-pagination',
      paginationType: 'progressbar',

      slideNextClass: '.home-swiper-button-next',
      slidePrevClass: '.home-swiper-button-prev',
    };

    this.linkStyles = {};
  }

  ngOnChanges() {
    this.slides = this.items ? this.selectSlides(this.items) : [];
  }

  // Compare the item genres with the genre list and returns genre names
  handleGetGenre(genreId: number[]): string {
    let mainGenre: string;
    if (this.genres) {
      this.genres.forEach(genre => {
        if (parseInt(genre.id) == genreId[0]) {
          mainGenre = genre.name;
        }
      });
    }

    return mainGenre;
  }

  selectSlides(items: UpcomingMovie[]) {
    let slidesArray: UpcomingMovie[] = [];
    if(!items.length) {
      return slidesArray;
    } else {
      items.forEach((item, i) => {
        if(i > 3 && i < 7) {
          slidesArray.push(item);
        }
      });
      
      return slidesArray;
    }
  }

  styleLink(backdropPath: string): object {
    this.linkStyles = {
      'background': `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)) center center no-repeat, #fff url(${tmdbConfig.secure_base_url}${tmdbConfig.backdrop_sizes[2]}${backdropPath}) center top no-repeat`,
      'background-size': 'cover, cover'
    };

    return this.linkStyles;
  }

}
