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
  public quotesSet$ = new Subject<Quotation[]>();
  allUserQuotes: Observable<any>;
  quotes: Quotation[];
  currentUserID: string;

  constructor(private angularFirestore: AngularFirestore,
              private authService: AuthService) {
    this.getCurrentUserQuotesFromDB();
  }

  getCurrentUserQuotesFromDB() {
    this.authService.getCurrentUserID().subscribe(currentUserID => {
      this.currentUserID = currentUserID;
      if (this.currentUserID !== '') {
        this.allUserQuotes = this.currentUserDB().valueChanges();
        this.allUserQuotes.subscribe(currentUserQuotes => {
          this.quotes = currentUserQuotes.quotes;
          this.quotesSet$.next(currentUserQuotes.quotes)
        });
      }
    });
  }

  // ? Connects with current user data
  currentUserDB() {
    if (this.currentUserID !== undefined) {
    return this.angularFirestore.collection('users').doc(this.currentUserID);
    }
  }

  getQuotesSet(): Observable<Quotation[]> {
    this.isRandomModeActive ? this.quotesSet$.next(this.pickTenRandomQuotes()) : this.quotesSet$.next(this.quotes);
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
    return this.currentUserDB().update({
      quotes: firestore.FieldValue.arrayUnion(quote)
    });
  }

  deleteQuote(quote) {
    return this.currentUserDB().update({
      quotes: firestore.FieldValue.arrayRemove(quote)
    });
  }

  updateQuote(oldQuoteData, updatedQuoteData) {
    const quoteId = oldQuoteData.id;
    updatedQuoteData.id = quoteId;
    this.currentUserDB().update({
      quotes: firestore.FieldValue.arrayRemove(oldQuoteData)
    });
    return this.currentUserDB().update({
      quotes: firestore.FieldValue.arrayUnion(updatedQuoteData)
    });
  }
}
