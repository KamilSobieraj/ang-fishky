import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../quotes.service';
import {Quotation} from '../../shared/quotation.model';

@Component({
  selector: 'app-random-quotes',
  templateUrl: './random-quotes.component.html',
  styleUrls: ['./random-quotes.component.scss']
})
export class RandomQuotesComponent implements OnInit {
  randomQuotes: Quotation[];
  constructor(private quoteService: QuotesService) { }

  ngOnInit() {
    this.randomQuotes = this.quoteService.pickTenRandomQuotes();
    this.quoteService.setTenNewRandomQuotesSet().subscribe(newRandomSet => this.randomQuotes = newRandomSet);
  }
}
