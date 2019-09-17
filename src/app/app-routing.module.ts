import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {QuotesComponent} from './quotes/quotes.component';
import {QuoteCardComponent} from './quotes/quote-card/quote-card.component';
import {QuoteCardDetailsComponent} from './quotes/quote-card-details/quote-card-details.component';
import {AuthorsComponent} from './authors/authors.component';
import {AddQuoteFormComponent} from './admin/add-quote-form/add-quote-form.component';
import {UpdateQuoteFormComponent} from './admin/update-quote-form/update-quote-form.component';
import {BooksComponent} from './books/books.component';
import {TagsComponent} from './tags/tags.component';
import {AuthorComponent} from './authors/author/author.component';
import {LoginComponent} from './admin/login/login.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {RegisterComponent} from './admin/register/register.component';
import {UserComponent} from './admin/user/user.component';
import {AuthGuard} from './admin/auth.guard';


const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: 'quotes', component: QuotesComponent, children: [
      {path: 'all', component: QuoteCardComponent},
    ]},
  {path: 'quotes/:id', component: QuoteCardDetailsComponent},
  {path: 'quotes/:id/update', component: UpdateQuoteFormComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'authors/:authorName', component: AuthorComponent},
  {path: 'books', component: BooksComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'admin', component: AddQuoteFormComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
