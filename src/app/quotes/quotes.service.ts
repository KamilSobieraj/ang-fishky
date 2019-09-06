import { Injectable } from '@angular/core';
import {Quotations} from '../shared/mock-quotations-database';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Quotation} from '../shared/quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  allQuotes = Quotations;
  isRandomModeActive: boolean;
  private isRandomModeActive$ = new BehaviorSubject(false);
  private randomChange$ = new Subject<Quotation[]>();

  constructor() { }

  getAllQuotes() {
    return this.allQuotes;
  }
  getTenRandomQuotes() {
    const shuffled = this.allQuotes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  setRandomMode(value) {
    this.isRandomModeActive$.next(value);
    this.getRandomModeStatus().subscribe(newModeStatus => this.isRandomModeActive = newModeStatus);
  }
  getRandomModeStatus(): Observable<boolean> {
    return this.isRandomModeActive$.asObservable();
  }

  getQuoteCardDetails(index: number) {
    return this.allQuotes[index];
  }
}
