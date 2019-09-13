import { Injectable } from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {QuotesService} from '../quotes/quotes.service';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  allQuotes: Quotation[];

  constructor(private quotesService: QuotesService) {
    this.allQuotes = this.quotesService.quotes;
  }

  getQuotesSortedByBooks() {
    return mapValues(groupBy(this.allQuotes, 'bookName'), x => x.map(y => omit(y, 'bookName')));
  }
}
