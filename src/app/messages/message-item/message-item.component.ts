import { Component, Input, OnInit } from '@angular/core';

import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // console.log("This is the message.sender " + this.message.sender);
    // console.log("This is the contact " + this.contactService.getContact(this.message.sender));

    const contact: Contact = this.contactService.getContact(this.message.id);
    this.messageSender = contact.name;
  }

}