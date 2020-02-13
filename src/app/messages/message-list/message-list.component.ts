import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  // @Output() messageAdded = new EventEmitter<Message>();

  // messages: Array<Message> = [
  //   new Message('1', 'Nameste', 'Hello Bishwa lai', 'Anu Lama'),
  //   new Message('2', 'Hello', 'Hello World', 'Anu Lama'),
  // ];

  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangeEvent
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}