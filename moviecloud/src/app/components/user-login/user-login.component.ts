import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  requestToken: string;
  loading: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.getRequestToken().subscribe(res => this.requestToken = res.request_token);
  }

  handleBrowseAsGuest() {
    this.loading = true;
    this.auth.getGuestSession().subscribe(res => {
      if(res.success) {
        this.auth.saveSession(res);
        this.loading = false;
        this.router.navigate(['profile', 'guest']);
      } else {
        this.loading = false;
      }
    });
  }

}
