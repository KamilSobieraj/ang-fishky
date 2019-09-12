import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../quotes/quotes.service';
import {Quotation} from '../shared/quotation.model';
import {Quote} from '../shared/Quote.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  list;

  constructor() {
  }

  ngOnInit() {
  }
}
