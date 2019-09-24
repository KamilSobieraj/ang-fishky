import { Injectable } from '@angular/core';
import {QuotesService} from '../quotes/quotes.service';
import {Quotation} from '../shared/quotation.model';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  allQuotes: Quotation[];
  authors$ = new Subject();

  constructor(private quotesService: QuotesService) {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.loadQuotes();
  }

  loadQuotes() {
    this.quotesService.getQuotesSet().subscribe(res => {
      this.allQuotes = res;
      this.authors$.next(res);
    });
  }

  sortQuotesByAuthors(setToSort) {
    return mapValues(groupBy(setToSort, 'author'), x => x.map(y => omit(y, 'author')));
  }

  getAuthorCardDetails(authorName: string) {
    return this.allQuotes.find(quote => quote.author === authorName);
  }

  getAuthors() {
    return this.authors$.asObservable();
  }
}
