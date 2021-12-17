import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './pages/document-list/document-list.component';
import { NewDocumentComponent } from './pages/new-document/new-document.component';

const routes: Routes = [
  { path: '', redirectTo : 'documents', pathMatch: 'full'  },
  { path: 'documents', component: DocumentListComponent  },
  { path: 'documents/:documentId', component: DocumentListComponent  },
  { path: 'newdocument', component: NewDocumentComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
