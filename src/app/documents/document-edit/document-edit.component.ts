import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../documents.model'
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(
      (params) => {
        console.log(params.id);
        if (!params.id){
          this.editMode = false;
        } else {
          this.originalDocument = this.documentService.getDocument(params.id);
          console.log(this.originalDocument);
          if(!this.originalDocument){
            return;
          }
          
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      }
    );
 }
 onsubmit(form: NgForm) {
   let values = form.value;
   let newDocument = new Document(
     this.document ? this.document.id : '0',
     values.title,
     values.description,
     values.url,
     []
   );

   if (this.editMode) {
     this.documentService.updateDocument(this.document, newDocument);
   } else {
     this.documentService.addDocument(newDocument);
   }
    this.router.navigate(['documents']);
       }

    onCancel() {
      this.router.navigate(['documents']);
    }
      }

    
  
