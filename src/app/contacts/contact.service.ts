import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contactListChangedEvent = new Subject<Contact[]>();
  maxId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
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

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      if (+contact.id > maxId) maxId = +contact.id;
    });
    return maxId + 1;
  }

  addContact(newDoc: Contact) {
    if (newDoc) {
      newDoc.id = `${this.maxId++}`;
      this.contacts.push(newDoc);
      let contactsClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsClone);
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      let realOGCon = this.contacts.find(contact => {
        return contact.id === originalContact.id;
      });
      let pos = this.contacts.indexOf(realOGCon);
      if (pos > -1) {
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        let contactsClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsClone);
      }
    }
  }
  
  deleteContact(contact: Contact) {
    if(!contact || !this.contacts.includes(contact)) {
      return;
    }
    
    const pos = this.contacts.indexOf(contact);
    //this.contacts.splice(pos, 1);
    //this.contactChangedEvent.next(this.contacts.slice());
    let contactsClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsClone);
  }
}