import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderContainer: HTMLElement;

  constructor() { }

  ngOnInit() {
    // Sets the opacity to 0 100ms after component mounted and removes loader from DOM 2 seconds after
    this.loaderContainer = document.querySelector('.loader-container');
    setTimeout(() => {

      this.loaderContainer.style.transition = 'opacity 5s';
      this.loaderContainer.style.opacity = '0';

      setTimeout(() => {
        this.loaderContainer.remove();
      }, 2000);

    }, 100);
  }

}
