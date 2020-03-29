import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable()
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number;
  // contactChangedEvent = new EventEmitter<Contact[]>();

  constructor(private http:HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  
  getContacts() {
    this.http.get('https://anucms.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice())
      }
    );
    //error function
    (error: any) => {
      console.log(error);
    }
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
      //this.contactListChangedEvent.next(contactsClone);
      this.storeContacts();
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
       // this.contactListChangedEvent.next(contactsClone);
       this.storeContacts();
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
    //this.contactListChangedEvent.next(contactsClone);
    this.storeContacts();
  }

  storeContacts(){
    let stringToServer = JSON.stringify(this.contacts);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put('https://anucms.firebaseio.com/contacts.json', stringToServer,{headers:header})
    .subscribe(result => {
      this.contactListChangedEvent.next(Object.assign(this.contacts));
    });
  }
}