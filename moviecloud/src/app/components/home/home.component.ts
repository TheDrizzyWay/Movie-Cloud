import { Component, OnInit } from '@angular/core';
import { ItemTypeService } from '@app/services/item-type/item-type.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemType: string;

  constructor(private itemService: ItemTypeService) { }

  ngOnInit() {
    this.itemType = this.itemService.getType();
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

}
