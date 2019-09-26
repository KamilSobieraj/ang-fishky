import {Component, Input, OnInit} from '@angular/core';
import {QuotesService} from '../quotes.service';
import {Quotation} from '../../shared/quotation.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
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
    this.quotesService.getQuotesSet().subscribe(currentUserQuotes => this.quotes = currentUserQuotes);
  }
}
