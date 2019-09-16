import { Component, OnInit } from '@angular/core';
import {AuthorsService} from './authors.service';
import {Quotation} from '../shared/quotation.model';
import {QuotesService} from '../quotes/quotes.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  allQuotes: Quotation[];

  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    this.allQuotes = this.authorsService.getQuotesSortedByAuthors();
  }
}
