import { Component, OnInit } from '@angular/core';
import {AuthService} from '../admin/auth.service';
import {QuotesService} from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  searchTerm: string;

  constructor() {
  }

  ngOnInit() {
  }
}
