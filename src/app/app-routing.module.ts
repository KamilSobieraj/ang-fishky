import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {QuotesComponent} from './quotes/quotes.component';
import {RandomQuotesComponent} from './quotes/random-quotes/random-quotes.component';
import {QuoteCardComponent} from './quotes/quote-card/quote-card.component';


const routes: Routes = [
  {path: 'quotes', component: QuotesComponent, children: [
      {path: 'all', component: QuoteCardComponent},
      {path: 'random', component: RandomQuotesComponent}
    ]},
  {path: '', redirectTo: 'quotes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
