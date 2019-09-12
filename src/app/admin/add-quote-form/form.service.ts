import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formTags$ = new Subject<string[]>();
  private formAllTags$ = new Subject<[]>();
  tags: string[] = [];

  constructor() { }

  setFormTags(newTag) {
    this.tags.push(newTag);
    this.formTags$.next(this.tags);
  }
  getFormTags(): Observable<string[]> {
    return this.formTags$.asObservable();
  }
  getAllTags(): Observable<string[]> {
    return this.formAllTags$.asObservable();
  }
}
