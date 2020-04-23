import { Component, OnInit } from '@angular/core';
import { DiscoverService } from '@app/services/discover/discover.service';
import { Movie } from '@app/models/Movie';
import { DiscoverOptions } from '@app/models/DiscoverOptions';
import { tmdbConfig } from '@app/utils/constants';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  page: number;
  requestOptions: DiscoverOptions;
  items: Movie[];
  tmdb: object = tmdbConfig;

  constructor(private discover: DiscoverService) { 
    this.page = 1;
    this.items = [];
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

  handleGetDiscover(page: number = 1): void {
    this.discover.get(page, this.requestOptions).subscribe(res => this.items = res);
  }

  sortOption(selected: string) {
    this.requestOptions.sortBy = selected;
  }

  getNextPage() {
    this.page = this.page + 1;
    this.handleGetDiscover(this.page);
  }

  getPreviousPage() {
    this.page = this.page - 1;
    this.handleGetDiscover(this.page);
  }

}
