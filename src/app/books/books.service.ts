import { Injectable } from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {QuotesService} from '../quotes/quotes.service';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  allQuotes: Quotation[];
  books$ = new Subject();

  constructor(private quotesService: QuotesService) {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.loadQuotes();
  }

  loadQuotes() {
    this.quotesService.getQuotesSet().subscribe(res => {
      this.allQuotes = res;
      this.books$.next(res);
    });
  }

  sortQuotesByBookNames(setToSort) {
    return mapValues(groupBy(setToSort, 'bookName'), x => x.map(y => omit(y, 'bookName')));
  }

  getBooks() {
    return this.books$.asObservable();
  }
}
