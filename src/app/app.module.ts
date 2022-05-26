import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { TypeTextComponent } from './animations/type-text/type-text.component';
import { NosServicesComponent } from './nos-services/nos-services.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';

import { AngularMaterialModule } from './material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NosArtistesComponent } from './nos-artistes/nos-artistes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TypeTextComponent,
    NosServicesComponent,
    ContactComponent,
    NosArtistesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
