import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { HeaderComponent } from './header/header.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessagesComponent } from './messages/messages.component';
import { DropdownDirective } from './shared/app.dropdown.directive';

import { AppRoutingModule } from './app-routing.module';
import { WindRefService } from './wind-ref.service';
import { ContactService } from './contacts/contact.service';
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    HeaderComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    MessagesComponent,
    DropdownDirective,
    DocumentEditComponent,
    DocumentViewComponent,
    ContactEditComponent,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    HttpClientModule,

  ],
  providers: [
    MessageListService,
    ContactService,
    WindRefService,
    ContactDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }