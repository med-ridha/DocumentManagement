import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  fileName="";
  mydate : string;
  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
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
        if (!doc[0]){
          this.router.navigate(['']);
          return;
        } 
        this.doc = doc
        const currentDate = new Date(this.doc[0].date)
        this.mydate = currentDate.toLocaleString();
        this.found = true;
      });
    });
    
  }
  onDocumentClick(documentId : string){
    console.log(documentId);
  }

  downloadFile(route: string): void{
    const baseUrl = 'http://localhost:1337/uploads/';
    const token = 'my JWT';
    const headers = new HttpHeaders().set('authorization','Bearer '+token);
    this.http.get(baseUrl + route,{headers, responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', route);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  deleteDocument(documentId : string){
    const bool = confirm("are you sure you want to delete this document? there is no go back from here")
    if (bool){
      this.documentService.deleteDocument(documentId).subscribe(() => {
        this.router.navigate([''])
      });
    }
  }
}
