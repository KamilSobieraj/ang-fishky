import { Injectable } from '@angular/core';
import {QuotesService} from '../quotes/quotes.service';
import {Quotation} from '../shared/quotation.model';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  allQuotes: Quotation[];

  constructor(private quotesService: QuotesService) {
    this.quotesService.getQuotesSet().subscribe(res => this.allQuotes = res);
    // this.allQuotes = this.quotesService.getQuotesSet();
  }

  getQuotesSortedByAuthors() {
    return mapValues(groupBy(this.allQuotes, 'author'), x => x.map(y => omit(y, 'author')));
  }
  getAuthorCardDetails(authorName: string) {
    return this.allQuotes.find(quote => quote.author === authorName);
  }
}
