import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../quotes.service';
import {Quotation} from '../../shared/quotation.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  constructor(private quotesService: QuotesService) { }
  randomModeStatus: boolean;
  quotes: Quotation[];

  ngOnInit() {
    this.quotesService.getRandomModeStatus().subscribe(initialRandomModeStatus => this.randomModeStatus = initialRandomModeStatus);
    this.randomModeStatus ? this.quotes = this.quotesService.pickTenRandomQuotes() : this.quotes = this.quotesService.getAllQuotes();
    this.quotesService.getNewQuotesSet().subscribe(newQuotesSet => this.quotes = newQuotesSet);
  }
}
