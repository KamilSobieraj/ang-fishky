import { Injectable } from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {QuotesService} from '../quotes/quotes.service';
import groupBy from 'lodash.groupBy';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  allQuotes: Quotation[];
  tags$ = new Subject();

  constructor(private quotesService: QuotesService) {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.loadQuotes();
    // this.allQuotes = this.quotesService.quotes;
  }

  loadQuotes() {
    this.quotesService.getQuotesSet().subscribe(res => {
      this.allQuotes = res;
      this.tags$.next(res);
    });
  }

  sortQuotesByTags(setToSort) {
    const tags = [];
    setToSort.map(quote => quote.tags.map(tag => tags.push({tagName: tag, ...quote})));
    return groupBy(tags, 'tagName');
  }

  getTags() {
    return this.tags$.asObservable();
  }
}
