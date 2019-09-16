import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../../../quotes/quotes.service';

@Component({
  selector: 'app-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.scss']
})
export class NavbarDropdownComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
  }
  onAuthorsClick() {
    this.quotesService.setNewQuotesSet();
  }
}
