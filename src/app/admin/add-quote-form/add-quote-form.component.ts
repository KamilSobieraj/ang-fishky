// TODO: clear form in better way + clear tags field in chips-input-component
// TODO: add choose list for authors, books etc.
import { Component, OnInit } from '@angular/core';
import {QuotesService} from '../../quotes/quotes.service';
import {FormService} from './form.service';
import {Router} from '@angular/router';
import {Quotation} from '../../shared/quotation.model';

@Component({
  selector: 'app-add-quote-form',
  templateUrl: './add-quote-form.component.html',
  styleUrls: ['./add-quote-form.component.scss']
})
export class AddQuoteFormComponent implements OnInit {
  quote: Quotation;
  constructor(private quotesService: QuotesService,
              private formService: FormService,
              private router: Router) {
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
    alert('New quotation added!');
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
    this.router.navigate(['quotes/all']);
  }
}
