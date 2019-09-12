import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Quotation} from '../shared/quotation.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Quote} from '../shared/Quote.model';


@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  isRandomModeActive: boolean;
  private isRandomModeActive$ = new BehaviorSubject(false);
  private quotesSet$ = new Subject<Quotation[]>();
  allQuotes: Observable<any>;
  quotes: Quotation[];

  constructor(private firestore: AngularFirestore) {
    this.allQuotes = this.firestore.collection('quotes').valueChanges({idField: 'id'});
    this.allQuotes.subscribe(res => this.quotes = res);
  }
  getQuotesFromDB() {
    return this.firestore.collection('quotes').valueChanges({idField: 'id'});
  }

  setNewQuotesSet() {
    this.isRandomModeActive ? this.quotesSet$.next(this.pickTenRandomQuotes()) : this.quotesSet$.next(this.quotes);
  }

  getNewQuotesSet(): Observable<Quotation[]> {
    return this.quotesSet$.asObservable();
  }

  pickTenRandomQuotes() {
    const shuffled = this.quotes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  setRandomMode(value) {
    this.isRandomModeActive$.next(value);
    this.getRandomModeStatus().subscribe(newModeStatus => this.isRandomModeActive = newModeStatus);
  }

  getRandomModeStatus(): Observable<boolean> {
    return this.isRandomModeActive$.asObservable();
  }

  getQuoteCardDetails(index: string) {
    return this.quotes.find(quote => quote.id === index);
  }

  addNewQuote(quote) {
    return new Promise<any>((res, rej) => {
      this.firestore.collection('quotes').add(quote).then(res => {
      }, err => rej(err));
    });
  }

  deleteQuote(quote) {
    return this.firestore.collection('quotes').doc(quote.id).delete();
  }

  updateQuote(oldQuoteData, updatedQuoteData) {
    const quote = this.firestore.doc(`quotes/${oldQuoteData.id}`);
    quote.update({...updatedQuoteData});

  }
}
