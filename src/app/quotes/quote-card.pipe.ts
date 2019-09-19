import { Pipe, PipeTransform } from '@angular/core';
import {Quotation} from '../shared/quotation.model';

@Pipe({
  name: 'quoteCardFilter'
})
export class QuoteCardPipe implements PipeTransform {

  transform(terms, searchTerm: string): any {
    if (!terms || !searchTerm) {
      return terms;
    }
    return terms.filter(term => term.content.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
