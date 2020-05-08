import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsResolver } from './resolvers/item-resolver.service';

const routes: Routes = [
  { path: 'profile/:status', component: UserProfileComponent },
  { path: 'log-in', component: UserLoginComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'search-results/:id', component: SearchResultsComponent },
  { 
    path: 'details/:type/:id',
    component: ItemDetailsComponent,
    resolve: {
      details: DetailsResolver
    },
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
