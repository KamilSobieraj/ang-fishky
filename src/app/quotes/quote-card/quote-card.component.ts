import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../quotes.service';
import {Quotation} from '../../shared/quotation.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  randomModeStatus: boolean;
  quotes;

  constructor(private quotesService: QuotesService) {
  }

  ngOnInit() {
    this.quotesService.getQuotesFromDB().subscribe(res => this.quotes = res);
    this.quotesService.getRandomModeStatus().subscribe(randomModeStatus => this.randomModeStatus = randomModeStatus);
    this.quotesService.getNewQuotesSet().subscribe(newQuotesSet => this.quotes = newQuotesSet);
  }
}
