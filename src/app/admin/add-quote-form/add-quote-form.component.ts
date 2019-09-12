// TODO: clear form in better way + clear tags field in chips-input-component
// TODO: add choose list for authors, books etc.
import { Component, OnInit } from '@angular/core';
import {Quote} from '../../shared/Quote.model';
import {QuotesService} from '../../quotes/quotes.service';
import {FormService} from './form.service';

@Component({
  selector: 'app-add-quote-form',
  templateUrl: './add-quote-form.component.html',
  styleUrls: ['./add-quote-form.component.scss']
})
export class AddQuoteFormComponent implements OnInit {
  quote: Quote;
  constructor(private quotesService: QuotesService,
              private formService: FormService) {
    this.quote = {
      // id: '15',
      content: '',
      author: '',
      bookName: '',
      pageNumber: '',
      publicationYear: '',
      editorName: '',
      tags: [],
      remarks: ''
    };
  }
  ngOnInit() {
    this.formService.getFormTags().subscribe(tags => this.quote.tags = tags);
  }
  // TODO: clear form in better way + clear tags field in chips-input-component
  onSubmitForm() {
    this.quotesService.addNewQuote(this.quote);
    alert("New quotation added!");
    this.quote = {
      // id: '15',
      content: '',
      author: '',
      bookName: '',
      pageNumber: '',
      publicationYear: '',
      editorName: '',
      tags: [],
      remarks: ''
    };
  }
}
