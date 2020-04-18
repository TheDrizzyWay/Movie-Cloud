import { Component, Input } from '@angular/core';
import { Genre } from '@app/models/Genre';
import { Movie } from '@app/models/Movie';
import { SwiperConfigInterface  } from 'ngx-swiper-wrapper';
import { tmdbConfig } from '@app/utils/constants';

@Component({
  selector: 'app-item-carousel',
  templateUrl: './item-carousel.component.html',
  styleUrls: ['./item-carousel.component.scss']
})
export class ItemCarouselComponent {
  @Input() itemType: string;
  @Input() genres: Genre[];
  @Input() items: Movie[];
  @Input() title: string;

  config: SwiperConfigInterface;
  tmdb: object = tmdbConfig;

  constructor() { 
    this.config = {
      slidesPerView: 7,
      loop: false,
      spaceBetween: 13,
      observer: true,
      breakpoints: {
        1145: {
          slidesPerView: 5
        },
        699: {
          slidesPerView: 3
        },
      },
      navigation: true,
      pagination: {
        el: '.home-swiper-pagination',
        clickable: true
      },
      slideNextClass: '.swiper-button-next',
      slidePrevClass: '.swiper-button-prev'
    };
  }

  handleGenres(genreIds: number[]): object {
    // Checks item's genre ids, compares them to genre list ids and returns genre names in an object
    if (this.genres) {
      let genresArr = this.genres.filter(genre => parseInt(genre.id, 10) == genreIds[0] || parseInt(genre.id, 10) == genreIds[1] ? genre.name : null);
      return { 
        name1: genresArr[0] ? genresArr[0].name : '',
        name2: genresArr[1] ? ` / ` + genresArr[1].name : ''
      };
    } else {
      return { name1: '', name2: '' };
    }
  }

}
