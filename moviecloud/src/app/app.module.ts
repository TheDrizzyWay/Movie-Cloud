import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { ItemCarouselComponent } from './components/item-carousel/item-carousel.component';
import { BackButtonDirective } from './shared/back-button/back-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemDetailsComponent,
    SearchResultsComponent,
    DiscoverComponent,
    UserLoginComponent,
    UserProfileComponent,
    LoaderComponent,
    MainFooterComponent,
    MainNavComponent,
    HomeHeaderComponent,
    ItemCarouselComponent,
    BackButtonDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
