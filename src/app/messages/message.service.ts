import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[];
  messageChangeEvent = new EventEmitter<Message[]>();

  messageListChangedEvent = new Subject<Message[]>();
  maxId: number;

  constructor(private http:HttpClient) {
   // this.messages = MOCKMESSAGES;
   this.maxId = this.getMaxId();
  }

  getMessages(): Message[] {
    //return this.messages.slice();
    this.http.get('https://anucms.firebaseio.com/messages.json'
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice())
      }
    );
    
    (error: any) => {
      console.log(error);
    }
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    let foundMessage = null;
    this.messages.forEach((message) => {
      if (message.id === id) {
        foundMessage = message;
      }
    });
    return foundMessage;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach(messages => {
      if (+messages.id > maxId) maxId = +messages.id;
    });
    return maxId + 1;
  }

  addMessage(message: Message) {
    if (newDoc) {
      newDoc.id = `${this.maxId++}`;
      this.messages.push(newDoc);
      let messagesClone = this.messages.slice();
      this.storemessages();
    // }
    // this.messages.push(message);
    // this.messageChangeEvent.emit(this.getMessages());
  }
}

 updateMessage(originalMessage: Message, newMessage: Message)
 if(originalMessage && newMessage){
   let realOGCon = this.messages.find(message => {
     return message.id === originalMessage.id;
   });
   this.messages[pos] = newMessages;
   let contactsClone = this.messages.slice();
   this.storeMessages();
 }
}
}

deleteMessage(message: message){
  if(!message || !this.messages.includes(message)){
    return;
  }

  const pos = this.messages.indexOf(message);
  let messagesClone = this.messages.slice();
  this.storeMessages();
}

storeMessages(){
  let stringToServe = JSON.stringify(this.messages);
  let header = new HttpHeaders({
    "Content-type":"application/json"
  });
  this.http.put('https://anucms.firebaseio.com/messages.json')
  .subscribe(result => {
    this.messageListChangeEvent.next(Object.assign(this.messages));
  });
}
