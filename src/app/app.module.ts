import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Pipe} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { NavbarTogglerComponent } from './header/navbar/navbar-toggler/navbar-toggler.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarDropdownComponent } from './header/navbar/navbar-dropdown/navbar-dropdown.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteCardComponent } from './quotes/quote-card/quote-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuoteCardDetailsComponent } from './quotes/quote-card-details/quote-card-details.component';
import { AuthorsComponent } from './authors/authors.component';
import {SvgIconComponent} from '../assets/svg-icon.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AddQuoteFormComponent } from './admin/add-quote-form/add-quote-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { ChipsInputComponent } from './admin/add-quote-form/chips-input/chips-input.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatNativeDateModule} from '@angular/material';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { UpdateQuoteFormComponent } from './admin/update-quote-form/update-quote-form.component';
import { BooksComponent } from './books/books.component';
import { TagsComponent } from './tags/tags.component';
import { QuoteCardPipe } from './quotes/quote-card.pipe';
import { AuthorComponent } from './authors/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    NavbarTogglerComponent,
    NavbarDropdownComponent,
    QuotesComponent,
    QuoteCardComponent,
    PageNotFoundComponent,
    QuoteCardDetailsComponent,
    AuthorsComponent,
    SvgIconComponent,
    AddQuoteFormComponent,
    ChipsInputComponent,
    UpdateQuoteFormComponent,
    BooksComponent,
    TagsComponent,
    QuoteCardPipe,
    AuthorComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MaterialModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
