import { Component, Input, OnChanges } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Genre } from '@app/models/Genre';
import { Movie } from '@app/models/Movie';
import { tmdbConfig } from '@app/utils/constants';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnChanges {
  @Input() itemType: string;
  @Input() genres: Genre[];
  @Input() items: Movie[];

  config: SwiperConfigInterface;
  linkStyles: object;
  slides: Movie[];
  
  constructor() { 
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      observer: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      navigation: true,
      pagination: {
        el: '.home-swiper-pagination',
        type: 'progressbar'
      },
      slideNextClass: '.home-swiper-button-next',
      slidePrevClass: '.home-swiper-button-prev',
    };

    this.linkStyles = {};
  }

  ngOnChanges() {
    this.slides = this.items ? this.selectSlides(this.items) : [];
  }

  // Compare the item genres with the genre list and returns genre names
  handleGetGenre(genreIds: number[]): string {
    let mainGenre: string;
    if (this.genres) {
      this.genres.forEach(genre => {
        if (parseInt(genre.id) == genreIds[0]) {
          mainGenre = genre.name;
        }
      });
    }

    return mainGenre;
  }

  selectSlides(items: Movie[]) {
    let slidesArray: Movie[] = [];
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
