import { Injectable } from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {QuotesService} from '../quotes/quotes.service';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  allQuotes: Quotation[];

  constructor(private quotesService: QuotesService) {
    this.allQuotes = this.quotesService.quotes;
  }

  getQuotesSortedByTags() {
    const tags = [];
    this.allQuotes.map(quote => quote.tags.map(tag => tags.push({tagName: tag, ...quote})));
    return groupBy(tags, 'tagName');
  }
}
