import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onReset() {
    this.authService.resetPassword(this.userEmail);
  }
}
