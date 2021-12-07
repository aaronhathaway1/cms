import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  private contactChangedSub: Subscription;


  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  // Can be deleted soon
  private defaultContact: Contact = this.contactService.getDefaultContact();

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.contactChangedSub = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => { this.contacts = contacts; }
    )
  }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact)
  }

  onNewContact() {
    this.contactService.addContact(this.defaultContact);
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.contactChangedSub.unsubscribe();
  }

}
