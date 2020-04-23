import { Component, OnInit } from '@angular/core';
import { DiscoverService } from '@app/services/discover/discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  page: number;
  requestOptions: object;

  constructor(private discover: DiscoverService) { 
    this.page = 1;
    this.requestOptions = {
      sortBy: 'popularity.desc',
      voteAverage: null,
      withPeople: null,
      withGenres: null,
      withKeywords: null,
      year: null,
    };
  }

  ngOnInit() {
    this.handleGetDiscover(this.page);
  }

  handleGetDiscover(page: number) {
    this.discover.get(page, this.requestOptions).subscribe();
  }

}
