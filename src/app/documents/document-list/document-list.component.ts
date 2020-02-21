//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService} from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];
  subscription: Subscription;
  

  constructor(private documentService: DocumentService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    );
  }

onNewDocument(){
  this.router.navigate(['new'], {relativeTo: this.activatedRoute});
}

}
