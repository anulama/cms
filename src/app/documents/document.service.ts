import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    // let foundDocument = null;
    // this.documents.forEach((document) => {
    //   if (document.id === id) {
    //     return document;
    //   }
    // });
    // return foundDocument;
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document){
    if (document == null){
      return;
    }

  const pos = this.documents.indexOf(document);
  this.documents.splice(pos, 1);
  this.documentChangedEvent.emit(this.documents.slice());
  }
} 