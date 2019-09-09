import { Component, OnInit } from '@angular/core';
import {AuthorsService} from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  allQuotes;
  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    this.allQuotes = this.authorsService.getAuthorsWithBooks();
  }

}
