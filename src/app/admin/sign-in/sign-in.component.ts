import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService) { }
  userEmail: string;
  userPassword: string;

  ngOnInit() {
  }

  onSignIn() {
<<<<<<< HEAD
    this.authService.signIn(this.userEmail, this.userPassword);
=======
    this.authService.emailLogin(this.userEmail, this.userPassword);
>>>>>>> noauth
  }

  onGoogleLogin() {
    this.authService.googleLogin();
  }

  onFacebookLogin() {
    this.authService.facebookLogin();
  }
}
