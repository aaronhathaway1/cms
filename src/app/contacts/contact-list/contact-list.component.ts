import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => { this.contacts = contacts; }
    )
  }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact)
  }

  onNewContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
