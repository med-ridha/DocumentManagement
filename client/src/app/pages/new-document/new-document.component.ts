import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/document.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss']
})
export class NewDocumentComponent implements OnInit {
  fileName="";
  file: File;
  constructor(private documentService: DocumentService, private router: Router) { }

  ngOnInit(): void {
  }

 onFileSelected(event: any){
   console.log(event)
   this.file = event.target.files[0];
     const t = document.getElementById("fileuploadtest")
    if (this.file) {
      this.fileName = this.file.name;
    }
   if (t) {
     t.classList.remove("red");
     t.classList.add("green");
   }
  }
  addDocument(name: string, desc: string, fileName: string){
    if (name.length == 0 || desc.length == 0 || fileName.length == 0){
      alert("all fields are required!!");
      return;
    }
    if (this.file) {
      this.fileName = this.file.name;
      const formData = new FormData();
      formData.append("fullname", name);
      formData.append("des", desc);
      formData.append("doc", fileName);
      formData.append("recfile", this.file);
      console.log(formData);
      const upload$ = this.documentService.createDocument(formData);
      upload$.subscribe( (doc: any) => this.router.navigate(['/documents', doc._id]) );
    }
    console.log(name);
    console.log(desc);
    console.log(fileName);
  }
}
