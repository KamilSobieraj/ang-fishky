import { Injectable } from '@angular/core';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import {QuotesService} from '../quotes/quotes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  allQuotes;

  constructor(private quotesService: QuotesService) {
    this.allQuotes = this.quotesService.quotes;
  }

  getQuotesSortedByAuthors() {
    return mapValues(groupBy(this.allQuotes, 'author'), x => x.map(y => omit(y, 'author')));
  }
}
