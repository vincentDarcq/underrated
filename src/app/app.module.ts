import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { TypeTextComponent } from './animations/type-text/type-text.component';
import { NosServicesComponent } from './nos-services/nos-services.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';

import { AngularMaterialModule } from './material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NosArtistesComponent } from './nos-artistes/nos-artistes.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { NewsComponent } from './news/news.component';
import { AdminFormsComponent } from './admins/admin-forms/admin-forms.component';
import { SigninComponent } from './admins/signin/signin.component';
import { ArtisteComponent } from './artiste/artiste.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TypeTextComponent,
    NosServicesComponent,
    ContactComponent,
    NosArtistesComponent,
    QuiSommesNousComponent,
    NewsComponent,
    AdminFormsComponent,
    SigninComponent,
    ArtisteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
