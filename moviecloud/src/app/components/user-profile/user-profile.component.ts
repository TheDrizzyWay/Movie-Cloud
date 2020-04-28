import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { GuestToken, SessionToken } from '@app/models/AuthResponses';
import { User } from '@app/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  status: string;
  requestToken: string;
  sessionData: GuestToken | SessionToken;
  userDetails: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
    ) { 
    this.status = this.route.snapshot.paramMap.get('status');
    this.requestToken = this.route.snapshot.queryParams['request_token'];
    this.sessionData = this.auth.getSession();
    this.userDetails = this.auth.getUser();
  }

  ngOnInit() {
    if(this.status == 'approved' && !this.sessionData) {
      this.auth.getUserSession(this.requestToken).subscribe(res => {
        if(res.success) {
          this.auth.saveSession(res);
          this.sessionData = res;
        }
      });
    }

    if(this.sessionData && this.sessionData.session_id && !this.userDetails) {
      this.auth.getUserDetails(this.sessionData.session_id).subscribe(res => {
        if(res.id) {
          this.auth.saveUser(res);
          this.userDetails = res;
        }
      });
    }
    
  }

  deleteSession() {
    if(this.sessionData.session_id) {
      this.auth.deleteSession();
      this.router.navigate(['']);
    }
  }

}
