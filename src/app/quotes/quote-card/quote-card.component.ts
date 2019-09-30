import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QuotesService} from '../quotes.service';
import {Quotation} from '../../shared/quotation.model';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit, OnDestroy {
  quotes: Quotation[];
  @Input() searchTerm;

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
    this.quotesService.getQuotesSet().pipe(takeUntil(componentDestroyed(this))).subscribe(
      currentUserQuotes => this.quotes = currentUserQuotes);
  }

  ngOnDestroy(): void {
  }
}
