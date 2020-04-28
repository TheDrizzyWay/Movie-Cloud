import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { GuestToken } from '@app/models/AuthResponses';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  status: string;
  requestToken: string;
  sessionData: GuestToken;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
    ) { 
    this.status = this.route.snapshot.paramMap.get('status');
    this.requestToken = this.route.snapshot.queryParams['request_token'];
    this.sessionData = this.auth.getSession();
  }

  ngOnInit() {
    console.log(this.sessionData);
    
  }

}
