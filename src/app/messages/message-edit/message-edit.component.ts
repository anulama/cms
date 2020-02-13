import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender: string = '7';
   @ViewChild('subjectInput',{ static: false }) subjectEl: ElementRef;
   @ViewChild('messageInput',{ static: false }) messageEl: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onClear() {
     this.subjectEl.nativeElement.value = '';
     this.messageEl.nativeElement.value = '';
  }

  onSendMessage() {
    const message = new Message(
    '1',
     this.subjectEl.nativeElement.value,
     this.messageEl.nativeElement.value,
     this.currentSender
   );
   this.addMessageEvent.emit(message);
   console.log(message);
   this.messageService.addMessage(message);
   this.onClear();
  }

}