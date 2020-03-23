import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  invalidGroupContact: boolean = false;
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(
     (params: Params) => {
       this.id = params['id'];
       if (!this.id) {
         this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(params.id);
          if (!this.originalContact){
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.contact.group){
            this.groupContacts = Object.assign(this.contact.group);
          }
        }
    );
  }

  onCancel(){
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact){
    if (!newContact) return true;
    if (newContact.id === this.contact.id) return true;
    for (let i = 0; i < this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }

    return false;

  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
     if (this.invalidGroupContact) {
       return;
     }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupContacts.length) return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

    }
  
