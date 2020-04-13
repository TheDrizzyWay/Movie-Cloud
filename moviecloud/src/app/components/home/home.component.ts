import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemTypeService } from '@app/services/item-type/item-type.service';
import { GlobalService } from '@app/services/global/global.service';
import { Genre } from '@app/models/Genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  itemType: string;
  movieSubscription: Subscription;
  tvSubscription: Subscription;
  movieGenres: Genre[];
  tvGenres: Genre[];

  constructor(
    private itemService: ItemTypeService,
    private globalService: GlobalService
    ) { }

  ngOnInit() {
    this.itemType = this.itemService.getType();

    this.movieSubscription = this.globalService.getMovieGenres().subscribe(res => {
        this.movieGenres = res.genres ? res.genres : [];
    });

    this.tvSubscription = this.globalService.getTvGenres().subscribe(res => {
      this.tvGenres = res.genres ? res.genres : [];
    })

    this.itemType == 'MOVIE' ? this.fetchContent('MOVIE') : this.fetchContent('TV');
  }

  toggleItemType(type: string): void {
    this.itemType = this.itemService.setType(type);
  }

  movieToggle() {
    this.toggleItemType('MOVIE');
    this.fetchContent('MOVIE');
  }

  tvToggle() {
    this.toggleItemType('TV');
    this.fetchContent('TV');
  }

  fetchContent(type: string) {

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.movieSubscription.unsubscribe();
  }

}
