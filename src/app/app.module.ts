import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { SearchBoxComponent } from './header/navbar/search-box/search-box.component';
import { NavbarTogglerComponent } from './header/navbar/navbar-toggler/navbar-toggler.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarDropdownComponent } from './header/navbar/navbar-dropdown/navbar-dropdown.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteCardComponent } from './quotes/quote-card/quote-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RandomQuotesComponent } from './quotes/random-quotes/random-quotes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SearchBoxComponent,
    NavbarTogglerComponent,
    NavbarDropdownComponent,
    QuotesComponent,
    QuoteCardComponent,
    PageNotFoundComponent,
    RandomQuotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
