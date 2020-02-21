import { Component, OnInit } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  //@Input() 
  document: Document;
  // constructor() { }
 // @Input()
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private windRef: WindRefService) {
                this.nativeWindow = this.windRef.getNativeWindow();
              }

  ngOnInit() {
   this.activeRoute.params.subscribe(
     (params) => {
       this.document = this.documentService.getDocument(params.id);
     }
   );
  }

  onView(){
    if (this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }
    onDelete(){
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['documents']);
    }

}
