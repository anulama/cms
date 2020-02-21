import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    let foundContact = null;
    this.contacts.forEach((contact) => {
      if (contact.id === id) {
        foundContact = contact;
      }
    });
    return foundContact;
  }
  
  deleteContact(contact: Contact) {
    if(contact == null) {
      return;
    }
    
    const pos = this.contacts.indexOf(contact);
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}