import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { GlobalService } from '@app/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  requestToken: string;

  constructor(
    private auth: AuthService,
    private global: GlobalService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.getRequestToken().subscribe(res => this.requestToken = res.request_token);
  }

  handleBrowseAsGuest(): Promise<boolean> {
    this.auth.getGuestSession().subscribe(res => {
      if(res.success) {
        this.global.sendGuestId(res.guest_session_id);
      }
    });
    
    return this.router.navigate(['profile', 'guest']);
  }

}
