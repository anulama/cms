import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
@Input() message: Message;
messageSender: string = "";
canEdit: boolean = false;

  constructor(private messageService: MessageService,
              private contactService: ContactService) { }

  ngOnInit() {
    //const contact: Contact = this.contactService.getContact(this.message.sender);
    //console.log(this.message);
    //console.log(contact);
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact ? contact.name: 'contacts not loaded'; 
  }

}
