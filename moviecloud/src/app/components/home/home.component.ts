import { Component, OnInit } from '@angular/core';
import { ItemTypeService } from '@app/services/item-type/item-type.service';
import { GlobalService } from '@app/services/global/global.service';
import { UpcomingService } from '@app/services/movies/movie.service';
import { TodayService } from '@app/services/tv/tv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemType: string;

  constructor(
    private itemService: ItemTypeService,
    private globalService: GlobalService,
    private upcoming: UpcomingService,
    private today: TodayService
    ) { }

  ngOnInit() {
    this.itemType = this.itemService.getType();

    this.globalService.getItemType().subscribe(res => {
      if (res) {
        this.itemType = res;
      }
    });

    this.itemType == 'MOVIE' ? this.fetchContent('MOVIE') : this.fetchContent('TV');
  }

  toggleItemType(type: string): void {
    this.globalService.sendItemType(type);
  }

  itemToggle(type: string) {
    this.toggleItemType(type);
    this.fetchContent(type);
  }

  fetchContent(type: string) {
    if(type == 'MOVIE') {
      
    }
    
  }

}
