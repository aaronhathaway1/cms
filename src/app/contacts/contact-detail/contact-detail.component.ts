import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styles: [
  ]
})
export class ContactDetailComponent implements OnInit {

  id: string;
  contact: Contact;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      )

  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete() {
    console.log("you tried to delete a contact");
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('contacts');
  }

}
