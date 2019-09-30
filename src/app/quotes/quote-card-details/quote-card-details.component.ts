// TODO: fix go back button (it always navigate to all, but never to random)

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quotation} from '../../shared/quotation.model';
import {QuotesService} from '../quotes.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-quote-card-details',
  templateUrl: './quote-card-details.component.html',
  styleUrls: ['./quote-card-details.component.scss']
})
export class QuoteCardDetailsComponent implements OnInit, OnDestroy {
quotation: Quotation;
id: string;
  constructor(private quotesService: QuotesService,
              private router: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
      this.router.params.pipe(takeUntil(componentDestroyed(this))).subscribe((params: Params) => {
      this.id = params['id'];
      this.getQuoteCardDetails();
    });
  }
  getQuoteCardDetails() {
    this.quotation = this.quotesService.getQuoteCardDetails(this.id);
  }

  onGoBack() {
    this.location.back();
  }
  onDeleteQuoteCard(quote) {
    this.quotesService.deleteQuote(quote);
    this.location.back();
  }

  ngOnDestroy(): void {
  }
}
