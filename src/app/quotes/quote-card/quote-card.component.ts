import {Component, Input, OnInit} from '@angular/core';
import {QuotesService} from '../quotes.service';
import {async} from 'rxjs/internal/scheduler/async';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../admin/auth.service';
import {Quotation} from '../../shared/quotation.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  randomModeStatus: boolean;
  quotes: Quotation[];
  @Input() searchTerm;
<<<<<<< HEAD
  constructor(private quotesService: QuotesService, private authService: AuthService) {
  }

  ngOnInit() {
    this.quotesService.getRandomModeStatus().subscribe(randomModeStatus => this.randomModeStatus = randomModeStatus);
    this.quotesService.getNewQuotesSet().subscribe(newQuotesSet => this.quotes = newQuotesSet);
    this.getQuotes();
  }
  getQuotes() {
    return this.quotes = this.quotesService.getQuotes();
=======

  exampleQuote = [
    {id: '0'},
    {content: 'Example quotation'},
    {author: 'Great mind'},
    {bookName: 'Important book'},
    {pageNumber: '123'},
    {publicationYear: '2011'},
    {editorName: 'Editor'},
    {tags: ['Politics', 'Enviroment']},
    {remarks: 'This quotation should be deleted'}
  ];

  constructor(private quotesService: QuotesService) {
  }

  ngOnInit() {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.quotesService.getQuotesSet().subscribe(res => this.quotes = res);
>>>>>>> noauth
  }
}
