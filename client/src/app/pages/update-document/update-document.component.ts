import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from 'src/app/document.service';
import Doc from "src/app/models/document"

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent implements OnInit {

  fileName="";
  file: File;
  documentId: string;
  doc : Doc;
  constructor(private route : ActivatedRoute,private documentService: DocumentService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      const documentId = params['documentId'];
      if (!documentId) return;
      this.documentService.getDocument(documentId).subscribe((doc: any) => {
        this.doc = doc[0];
      });
    });
  }

 onFileSelected(event: any){
   console.log(event)
   this.file = event.target.files[0];
     const t = document.getElementById("fileupload")
    if (this.file) {
      this.fileName = this.file.name;
    }
   if (t) {
     t.classList.remove("red");
     t.classList.add("green");
   }
  }
  updateDocument(name: string, desc: string, fileName: string){
    const bool = confirm("are you sure you want to update this document?");
    if (bool){
      if (name.length == 0) name = this.doc.fullName; 
      if (desc.length == 0) desc = this.doc.description; 
      if (fileName.length == 0) fileName = this.doc.doc; 
      const formData = new FormData();
      formData.append("fullname", name);
      formData.append("des", desc);
      formData.append("doc", fileName);
      if (this.file) {
        this.fileName = this.file.name;
        formData.append("recfile", this.file);
      }
      console.log(formData);

      const upload$ = this.documentService.updateDocument(this.doc._id, formData);
      upload$.subscribe( () => this.router.navigate(['/documents/', this.doc._id]) );
      console.log(name);
      console.log(desc);
      console.log(fileName);
    }
  }

}
