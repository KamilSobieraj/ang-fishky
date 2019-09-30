import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from './authors.service';
import {QuotesService} from '../quotes/quotes.service';
import {Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authors: {};

  constructor(private authorsService: AuthorsService,
              private quotesService: QuotesService) { }

  ngOnInit() {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.getAuthors();
  }

  getAuthors() {
    this.authorsService.getAuthors().pipe(takeUntil(componentDestroyed(this))).subscribe(quotes => {
      this.authors = this.authorsService.sortQuotesByAuthors(quotes);
    });
  }

  ngOnDestroy(): void {
  }
}
