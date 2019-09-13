import { Component, OnInit } from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {AuthorsService} from '../authors/authors.service';
import {BooksService} from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  allQuotes: Quotation[];

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.allQuotes = this.booksService.getQuotesSortedByBooks();
  }

}
