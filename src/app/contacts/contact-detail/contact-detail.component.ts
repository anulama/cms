import { Contact } from '../contact.model';
import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(
      (params: Params) => {
        console.log(params)
        this.contact = this.contactService.getContact(params.id);
        console.log(this.contact)
      }
    )
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts'], { relativeTo: this.activatedRoute});
  }

}
