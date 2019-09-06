import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../../quotes/quotes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private quotesService: QuotesService
  ) { }

  ngOnInit() {
  }
  onQuotationsClick() {
    this.quotesService.setRandomMode(false);
  }
  onNewRandomQuotesSet() {
    this.quotesService.getTenRandomQuotes();
    this.quotesService.setRandomMode(true);
  }
}
