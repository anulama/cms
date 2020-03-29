import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
//import { Subject } from 'rxjs';
//import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  [x: string]: any;
  messages: Message[] = [];

  constructor() {
   this.messages = MOCKMESSAGES;
  }
    
  addMessage(message: Message) {
    this.messages.push(message);
  }

  getMessages(){
    return this.messages.slice();
  }
  getMessage(id: string, name: string){

  }
}
