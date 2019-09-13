// TODO: fix chips - old ones appears when new chip is added
// TODO: add choose list for authors, books etc.

import {Component, OnInit, ViewChild} from '@angular/core';
import {QuotesService} from '../../quotes/quotes.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormService} from '../add-quote-form/form.service';
import {Location} from '@angular/common';
import {Quotation} from '../../shared/quotation.model';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-update-quote-form',
  templateUrl: './update-quote-form.component.html',
  styleUrls: ['./update-quote-form.component.scss']
})
export class UpdateQuoteFormComponent implements OnInit {
  chosenQuote: Quotation;
  quote: Quotation;
  id: string;

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
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getQuoteCardDetails();
    });

    this.formService.getFormTags().subscribe(tags => this.quote.tags = tags);

    this.quote = {
      content: this.chosenQuote.content,
      author: this.chosenQuote.author,
      bookName: this.chosenQuote.bookName,
      pageNumber: this.chosenQuote.pageNumber,
      publicationYear: this.chosenQuote.publicationYear,
      editorName: this.chosenQuote.editorName,
      tags: this.chosenQuote.tags,
      remarks: this.chosenQuote.remarks
    };
  }

  getQuoteCardDetails() {
    this.chosenQuote = this.quotesService.getQuoteCardDetails(this.id);
  }
  // TODO: clear form in better way + clear tags field in chips-input-component
  onUpdate() {
    this.quotesService.updateQuote(this.chosenQuote, this.quote);
    alert('Quotation updated!');
    this.location.back();
  }
}
