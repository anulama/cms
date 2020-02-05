import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() messageAdded = new EventEmitter<Message>();

  messages: Array<Message> = [
    new Message('1', 'Nameste', 'Hello Bishwa lai', 'Anu Lama'),
    new Message('2', 'Hello', 'Hello World', 'Anu Lama'),
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.messages);
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}