import { Component, Input, OnChanges } from '@angular/core';
import { Genre } from '@app/models/Genre';
import { GlobalService } from '@app/services/global/global.service';
import { UpcomingMovie } from '@app/models/UpcomingMovie';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnChanges {
  @Input() itemType: string;
  @Input() genres: Genre[];
  @Input() items: UpcomingMovie[];
  
  constructor(private globalService: GlobalService) { }

  ngOnChanges() {
    console.log(this.items);
  }

}
