// TODO: clear form in better way + clear tags field in chips-input-component
// TODO: add choose list for authors, books etc.
// TODO: make inputs reusable - part input into separate components
// TODO: validators?

import {Component, OnInit, ViewChild} from '@angular/core';
import {QuotesService} from '../../quotes/quotes.service';
import {FormService} from './form.service';
import {Router} from '@angular/router';
import {Quotation} from '../../shared/quotation.model';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-quote-form',
  templateUrl: './add-quote-form.component.html',
  styleUrls: ['./add-quote-form.component.scss']
})
export class AddQuoteFormComponent implements OnInit {
  quote: Quotation;
  @ViewChild('authorInstance', {static: true}) authorInstance: NgbTypeahead;
  authorFocus$ = new Subject<string>();
  authorClick$ = new Subject<string>();
  @ViewChild('bookNameInstance', {static: true}) bookNameInstance: NgbTypeahead;
  bookNameFocus$ = new Subject<string>();
  bookNameClick$ = new Subject<string>();
  @ViewChild('editorNameInstance', {static: true}) editorNameInstance: NgbTypeahead;
  editorNameFocus$ = new Subject<string>();
  editorNameClick$ = new Subject<string>();

  searchAuthor = this.formService.searchTemplate('author', this.authorClick$, this.authorFocus$);
  searchBookName = this.formService.searchTemplate('bookName', this.bookNameClick$, this.bookNameFocus$);
  searchEditorName = this.formService.searchTemplate('editorName', this.editorNameClick$, this.editorNameFocus$);

  constructor(private quotesService: QuotesService,
              private formService: FormService,
              private router: Router) {
    this.quote = {
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
    this.quote.id = uuid.v4();
    this.quotesService.addNewQuote(this.quote);
    alert('New quotation added!');
    this.quote = {
      id: '',
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
