//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService} from '../document.service';
//import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document[]>();

  private documents: Document[] = [];
  subscription: Subscription;
  

  constructor(private documentService: DocumentService) {
             this.documentService.getDocuments();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit(){
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
  
  }

