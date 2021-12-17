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
  createDocument (payload: any){
    return this.webService.post('documents/create', payload );
  }
  deleteDocument (payload: any){
    return this.webService.delete('documents/delete/'+payload );
  }
}
