//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Doc1', 'Description1', 'htts://1.com', null),
    new Document('2', 'Doc2', 'Description2', 'htts://2.com', null),
    new Document('3', 'Doc3', 'Description3', 'htts://3.com', null),
    new Document('4', 'Doc4', 'Description4', 'htts://4.com', null),
    new Document('5', 'Doc5', 'Description5', 'htts://5.com', null)
  ];
  constructor() { }

  ngOnInit() {
  }
  
  onSelectDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
    console.log(document)
  }

}
