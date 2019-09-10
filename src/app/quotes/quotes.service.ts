import { Injectable } from '@angular/core';
import {Quotations} from '../shared/mock-quotations-database';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Quotation} from '../shared/quotation.model';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  allQuotes = Quotations;
  isRandomModeActive = false;
  private isRandomModeActive$ = new BehaviorSubject(false);
  private quotesSet$ = new Subject<Quotation[]>();
  quotes: Observable<Quotation[]>;

  constructor(private firestore: AngularFirestore) {

  }
  getQuotesFromDB() {
    return this.firestore.collection('quotes').snapshotChanges();
  }
  addNewQuote(quote) {
    return new Promise<any>((res, rej) => {
      this.firestore.collection('quotes').add(quote).then(res => {}, err => rej(err));
    });
}
  getAllQuotes() {
    return this.allQuotes;
  }
  pickTenRandomQuotes() {
    const shuffled = this.allQuotes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
  setNewQuotesSet() {
    this.isRandomModeActive ? this.quotesSet$.next(this.pickTenRandomQuotes())  : this.quotesSet$.next(this.getAllQuotes());
  }
  getNewQuotesSet(): Observable<Quotation[]> {
    return this.quotesSet$.asObservable();
  }

  setRandomMode(value) {
    this.isRandomModeActive$.next(value);
    this.getRandomModeStatus().subscribe(newModeStatus => this.isRandomModeActive = newModeStatus);
  }
  getRandomModeStatus(): Observable<boolean> {
    return this.isRandomModeActive$.asObservable();
  }

  getQuoteCardDetails(index: string) {
    return this.allQuotes.find(quote => quote.id === index);
  }
}
