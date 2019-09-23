import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    this.authService.emailRegister(this.userEmail, this.userPassword);
  }

  onGoogleLogin() {
    this.authService.googleLogin();
  }

  onFacebookLogin() {
    this.authService.facebookLogin();
  }
}
