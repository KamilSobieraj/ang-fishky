import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {AuthorsService} from '../authors/authors.service';
import {TagsService} from './tags.service';
import {Subscription} from 'rxjs';
import {QuotesService} from '../quotes/quotes.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  // allQuotes: Quotation[];
  tags: {};
  tagsSub: Subscription;

  constructor(private tagsService: TagsService,
              private quotesService: QuotesService) {
  }

  ngOnInit() {
    // this.allQuotes = this.tagsService.getQuotesSortedByTags();
    this.quotesService.getCurrentUserQuotesFromDB();
    this.getTags();
  }

  getTags() {
    this.tagsSub = this.tagsService.getTags().subscribe(quotes => {
      this.tags = this.tagsService.sortQuotesByTags(quotes);
    });
  }

  ngOnDestroy(): void {
    this.tagsSub.unsubscribe();
  }
}
