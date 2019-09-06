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
  allQuotes: Quotation[];
  randomQuotes: Quotation[];
  randomModeStatus: boolean;

  ngOnInit() {
    this.allQuotes = this.quotesService.getAllQuotes();
    this.randomQuotes = this.quotesService.getTenRandomQuotes();
    this.quotesService.getRandomModeStatus().subscribe(initialRandomModeStatus => this.randomModeStatus = initialRandomModeStatus);

  }
}
