import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from './books.service';
import {QuotesService} from '../quotes/quotes.service';
import { takeUntil } from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: {};

  constructor(private booksService: BooksService,
              private quotesService: QuotesService) { }

  ngOnInit() {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().pipe(takeUntil(componentDestroyed(this))).subscribe(quotes => {
    this.books = this.booksService.sortQuotesByBookNames(quotes);
  });
  }

  ngOnDestroy(): void {
  }

}
