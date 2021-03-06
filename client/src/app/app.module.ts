import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentListComponent } from './pages/document-list/document-list.component';
import { NewDocumentComponent } from './pages/new-document/new-document.component';
import { UpdateDocumentComponent } from './pages/update-document/update-document.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    NewDocumentComponent,
    UpdateDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
