import { Injectable } from '@angular/core';
import {QuotesService} from '../quotes/quotes.service';
import {Quotation} from '../shared/quotation.model';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  allQuotes: Quotation[];

  constructor(private quotesService: QuotesService) {
    this.allQuotes = this.quotesService.quotes;
  }

  getQuotesSortedByAuthors() {
    return mapValues(groupBy(this.allQuotes, 'author'), x => x.map(y => omit(y, 'author')));
  }
}
