import { Component, OnInit } from '@angular/core';
import {AuthService} from '../admin/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    // console.log(this.authService.isLoggedIn);
    // this.user = this.authService.userData;
  }
}
