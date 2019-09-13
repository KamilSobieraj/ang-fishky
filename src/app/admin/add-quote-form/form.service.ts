import { Injectable } from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {QuotesService} from '../../quotes/quotes.service';
import {Quotation} from '../../shared/quotation.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formTags$ = new Subject<string[]>();
  private formAllTags$ = new Subject<[]>();
  tags: string[] = [];
  quotes: Quotation[];

  constructor(private quotesService: QuotesService) {
    this.quotes = this.quotesService.quotes;
  }
  getQuotes() {
   const authors = this.quotes.map(quote => quote.author);
   return authors;
  }
  getValuesOfProperty(propertyName) {
     const filteredValues = this.quotes.map(quote => quote[propertyName]);
     return [...new Set(filteredValues)];
  }

  setFormTags(newTag) {
    this.tags.push(newTag);
    this.formTags$.next(this.tags);
  }
  getFormTags(): Observable<string[]> {
    return this.formTags$.asObservable();
  }
  getAllTags(): Observable<string[]> {
    return this.formAllTags$.asObservable();
  }

  searchTemplate(propertyName: string, propertyClick, propertyFocus) {
    return (text$: Observable<string>) => {
      const propertyValues = this.getValuesOfProperty(propertyName);
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      // const clicksWithClosedPopup$ = propertyClick.pipe(filter(() => !propertyInstance.isPopupOpen()));
      const inputFocus$ = propertyFocus;

      return merge(debouncedText$, inputFocus$).pipe(
        map(term => (term === '' ? propertyValues
          : propertyValues.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    };
  }
}
