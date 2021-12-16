import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  constructor(private webService: WebService) { }

  getDocuments(){
    return this.webService.get('documents/all');
  }
  
  getDocument(documentId : string){
    return this.webService.get(`documents/${documentId}`);
  }
  createDocument (fullName: string, descreption: string, doc: string){
    const payload : Object = {
      "fullname" :fullName,
      "des" : descreption,
      "doc" : doc
    };
    return this.webService.post('documents/create', payload );
  }
}
