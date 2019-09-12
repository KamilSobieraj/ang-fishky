// TODO: fix chips - old ones appears when new chip is added
// TODO: add choose list for authors, books etc.

import { Component, OnInit } from '@angular/core';
import {Quote} from '../../shared/Quote.model';
import {QuotesService} from '../../quotes/quotes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormService} from '../add-quote-form/form.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-quote-form',
  templateUrl: './update-quote-form.component.html',
  styleUrls: ['./update-quote-form.component.scss']
})
export class UpdateQuoteFormComponent implements OnInit {
  chosenQuote;
  quote: Quote;
  id: string;
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
      // id: '15',
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
