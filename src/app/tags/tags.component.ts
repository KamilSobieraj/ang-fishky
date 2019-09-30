import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagsService} from './tags.service';
import {QuotesService} from '../quotes/quotes.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: {};

  constructor(private tagsService: TagsService,
              private quotesService: QuotesService) {
  }

  ngOnInit() {
    this.quotesService.getCurrentUserQuotesFromDB();
    this.getTags();
  }

  getTags() {
    this.tagsService.getTags().pipe(takeUntil(componentDestroyed(this))).subscribe(quotes => {
      this.tags = this.tagsService.sortQuotesByTags(quotes);
    });
  }

  ngOnDestroy(): void {
  }
}
