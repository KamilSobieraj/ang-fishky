import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorsService} from './authors.service';
import {QuotesService} from '../quotes/quotes.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authors: {};
  authorsSub: Subscription;
  constructor(private authorsService: AuthorsService,
              private quotesService: QuotesService) { }

  ngOnInit() {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.getAuthors();
  }

  getAuthors() {
    this.authorsSub = this.authorsService.getAuthors().subscribe(quotes => {
      this.authors = this.authorsService.sortQuotesByAuthors(quotes);
    });
  }

  ngOnDestroy(): void {
    this.authorsSub.unsubscribe();
  }
}
