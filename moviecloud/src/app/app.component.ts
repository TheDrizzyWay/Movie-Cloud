import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'moviecloud';

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.sendMovieGenres();
    this.globalService.sendTvGenres();
  }
}
