import { Injectable } from '@angular/core';
import {Quote} from '@angular/compiler';
import {Quotations} from '../shared/mock-quotations-database';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  quotes = Quotations;
  randomSelectedQuotes;
  constructor() { }

  getQuotes() {
    return this.quotes;
  }
  getTenRandomQuotes() {
    const shuffled = this.quotes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
  getQuoteCardDetails(index: number) {
    return this.quotes[index];
  }
}
