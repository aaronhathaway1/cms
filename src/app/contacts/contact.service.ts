import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[];
  private maxContactId: number;
  private currentContactId: number;
  private contactsClone: Contact[];
  private pos: number;

  // Can be deleted soon
  private defaultContact: Contact = {
    id: '1',
    name: 'Rex Barzee',
    email: 'barzeer@byui.edu',
    phone: '208-496-3768',
    imageUrl: '../../assets/images/barzeer.jpg',
    group: null
  }

  // Can be deleted soon
  getDefaultContact() {
    return this.defaultContact;
  }

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxContactId();
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);

    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getMaxContactId(): number {
    this.maxContactId = 0;

    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i];
      this.currentContactId = +contact.id;

      if (this.currentContactId > this.maxContactId) {
        this.maxContactId = this.currentContactId;
      }
    }

    return this.maxContactId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsClone = this.contacts.slice();
    this.contactChangedEvent.next(this.contactsClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    this.pos = this.contacts.indexOf(originalContact);
    if (this.pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[this.pos] = newContact;
    this.contactsClone = this.contacts.slice();
    this.contactChangedEvent.next(this.contactsClone);
  }

}
