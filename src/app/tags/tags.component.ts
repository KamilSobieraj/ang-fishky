import { Component, OnInit } from '@angular/core';
import {Quotation} from '../shared/quotation.model';
import {AuthorsService} from '../authors/authors.service';
import {TagsService} from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  allQuotes: Quotation[];

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.allQuotes = this.tagsService.getQuotesSortedByTags();
    console.log(this.allQuotes);
  }

}
