import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {AuthorsService} from '../authors/authors.service';
import {BooksService} from './books.service';
import {Subscription} from 'rxjs';
import {QuotesService} from '../quotes/quotes.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: {};
  booksSub: Subscription;

  constructor(private booksService: BooksService,
              private quotesService: QuotesService) { }

  ngOnInit() {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.getBooks();
  }

  getBooks() {
  this.booksSub = this.booksService.getBooks().subscribe(quotes => {
    this.books = this.booksService.sortQuotesByBookNames(quotes);
  });
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }

}
