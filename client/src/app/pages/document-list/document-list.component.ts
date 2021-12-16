import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from 'src/app/document.service';
import Doc from "src/app/models/document"

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: Doc[] = [];
  doc : Doc[] = [new Doc()];
  found = false;
  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.documentService.getDocuments()
    .subscribe((doc: any)=>{
      this.documents = doc
    });

    this.route.params.subscribe((params: Params)=>{
      const documentId = params['documentId'];
      if (!documentId) return;
      this.documentService.getDocument(documentId).subscribe((doc: any) => {
        this.doc = doc
        this.found = true;
      });
    });
    
  }
  onDocumentClick(documentId : string){
    console.log(documentId);
  }
}
