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
  quotes: Quotation[];

  ngOnInit() {
    this.quotes = this.quotesService.getQuotes();
  }
onCl() {
    console.log(this.quotes[0].content);
}
}
