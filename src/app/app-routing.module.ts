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
import {AuthGuard} from './admin/auth.guard';
import {SignInComponent} from './admin/sign-in/sign-in.component';
import {SignUpComponent} from './admin/sign-up/sign-up.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {ForgotPasswordComponent} from './admin/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './admin/verify-email/verify-email.component';
import {SecureInnerPagesGuard} from './admin/secure-inner-pages.guard';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
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
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
