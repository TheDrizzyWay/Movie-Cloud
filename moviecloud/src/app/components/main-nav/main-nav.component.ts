import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  navBarStatus: boolean;

  constructor() { 
    this.navBarStatus = false;
  }

  ngOnInit() {
    // Set animations
    setTimeout(() => {
      document.querySelectorAll('.main-nav-bottom-section__button').forEach(button => {
        button.classList.add('fadeInLeft');
      });

      document.querySelector('.main-nav-top-section__image').classList.add('fadeInLeft');
      document.querySelector('.main-nav-search-form').classList.add('bounce');

    }, 500);
    
  }

  toggleNavbar(): void {
    this.navBarStatus = !this.navBarStatus;
  }

  setNavClass(position: string): object {
    const topClasses = {
      'main-nav-top-section': true,
      'main-nav-top-section--hide': !this.navBarStatus
    };

    const bottomClasses = {
      'main-nav-bottom-section': true,
      'main-nav-bottom-section--hide': !this.navBarStatus
    };

    return position === 'top' ? topClasses : bottomClasses;
  }

  setHamburgerClass(): object {
    const classes = {
      'main-nav-toggle-button hamburger hamburger--elastic': true,
      'is-active': this.navBarStatus
    };

    return classes;
  }


}
