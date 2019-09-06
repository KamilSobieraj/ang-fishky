import { Injectable } from '@angular/core';
import {Quotations} from '../shared/mock-quotations-database';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  allQuotes = Quotations;
  private randomQuestSet$ = new Subject();

  constructor() { }

  getNewRandomSet() {
    this.randomQuestSet$.next(this.pickTenRandomQuotes());
  }
  pickTenRandomQuotes() {
    const shuffled = this.allQuotes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
  setTenNewRandomQuotesSet(): Observable<any> {
    this.getNewRandomSet();
    return this.randomQuestSet$.asObservable();
  }

  getAllQuotes() {
    return this.allQuotes;
  }

  getQuoteCardDetails(index: number) {
    return this.allQuotes[index];
  }
}
