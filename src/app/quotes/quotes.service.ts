import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Quotation} from '../shared/quotation.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {AuthService} from '../admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  isRandomModeActive: boolean;
  private isRandomModeActive$ = new BehaviorSubject(false);
  private quotesSet$ = new Subject<Quotation[]>();
  allUserQuotes: Observable<any>;
  quotes: Quotation[];
  userID: string;

  constructor(private fstore: AngularFirestore,
              private authService: AuthService) {
    this.userID = this.authService.getUserID();
    this.allUserQuotes = this.fstore.collection('users').doc(this.userID).valueChanges();
    this.allUserQuotes.subscribe(res => this.quotes = res.quotes);
    this.quotes = this.getQuotes();
  }
  getQuotesFromDB() {
    return this.fstore.collection('users').doc(this.userID).valueChanges();
  }

  getQuotes() {
    this.getQuotesFromDB().subscribe(); // ? --> takes the newest data from FireBase - needed to update card display
    this.setNewQuotesSet();
    return this.quotes;
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
    return this.fstore.collection('users').doc(this.userID).update({
      quotes: firestore.FieldValue.arrayUnion(quote)
    });
  }

  deleteQuote(quote) {
    return this.fstore.collection('users').doc(this.userID).update({
      quotes: firestore.FieldValue.arrayRemove(quote)
    });
  }

  updateQuote(oldQuoteData, updatedQuoteData) {
    const quoteId = oldQuoteData.id;
    updatedQuoteData.id = quoteId;
    this.fstore.collection('users').doc(this.userID).update({
      quotes: firestore.FieldValue.arrayRemove(oldQuoteData)
    });
    return this.fstore.collection('users').doc(this.userID).update({
      quotes: firestore.FieldValue.arrayUnion(updatedQuoteData)
    });
  }
}
