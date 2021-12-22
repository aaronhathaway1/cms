import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  id: string;
  editMode = false;
  groupContacts;
  contactForm: FormGroup

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  initForm() {

    let contactName = '';
    let contactEmail = '';
    let contactPhone = '';
    let contactImageURL = '';
    // let contactGroup = ''; //this is like the ingredients?

    if (this.editMode) {
      const contact = this.contactService.getContact(this.id);
      contactName = contact.name;
      contactEmail = contact.email;
      contactPhone = contact.phone;
      contactImageURL = contact.imageUrl;
    }

    this.contactForm = new FormGroup({
      'name': new FormControl(contactName, Validators.required),
      'email': new FormControl(contactEmail, [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      'phone': new FormControl(contactPhone, Validators.pattern(/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/)),
      'imageURL': new FormControl(contactImageURL),
    });
  }

  onSubmitContact() {
    console.log(this.contactForm);
  }

  onCancel() {

  }

  onRemoveItem() {

  }

}
