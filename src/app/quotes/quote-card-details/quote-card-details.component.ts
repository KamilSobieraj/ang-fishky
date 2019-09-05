import { Component, OnInit } from '@angular/core';
import {Quotation} from '../../shared/quotation.model';
import {QuotesService} from '../quotes.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-quote-card-details',
  templateUrl: './quote-card-details.component.html',
  styleUrls: ['./quote-card-details.component.scss']
})
export class QuoteCardDetailsComponent implements OnInit {
quotation: Quotation;
id: number;
  constructor(private quotesService: QuotesService,
              private router: ActivatedRoute) { }

  ngOnInit() {
      this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.quotation = this.quotesService.getQuoteCardDetails(this.id);
    });
  }

}
