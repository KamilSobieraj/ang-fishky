import { Injectable } from '@angular/core';
import {Quotations} from '../shared/mock-quotations-database';
import groupBy from 'lodash.groupBy';
import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  allQuotes = Quotations;

  constructor() {
  }

  getAuthorsWithBooks() {
    return mapValues(groupBy(this.allQuotes, 'author'), x => x.map(y => omit(y, 'author')));
  }
}

