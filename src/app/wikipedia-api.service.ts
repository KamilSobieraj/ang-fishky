import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaAPIService {

  constructor(private http: HttpClient) { }

  getWikiData(searchTerm) {
    const baseUrl = 'https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=' + searchTerm;
    return this.http.get(baseUrl);
  }
}
