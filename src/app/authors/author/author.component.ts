import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthorsService} from '../authors.service';
import {Location} from '@angular/common';
import {WikipediaAPIService} from '../../wikipedia-api.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy {
authorName: string;
authorDetails;
wikiData;
  constructor(private router: ActivatedRoute,
              private authorsService: AuthorsService,
              private location: Location,
              private wikiService: WikipediaAPIService) {
  }

  ngOnInit() {
    this.router.params.pipe(takeUntil(componentDestroyed(this))).subscribe((params: Params) => {
      this.authorName = params['authorName'];
      this.getAuthorCardDetails();
    });
    this.wikiService.getWikiData(this.authorName).pipe(takeUntil(componentDestroyed(this))).subscribe(res => this.wikiData = res[2]);
  }

  getAuthorCardDetails() {
    this.authorDetails = this.authorsService.getAuthorCardDetails(this.authorName);
  }

  onGoBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
  }
}
