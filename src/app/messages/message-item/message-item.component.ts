import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;

  // message: Message = { id: 1, subject: "The subject", msgText: "the text of the message", sender: "sender" }

  constructor() { }

  ngOnInit(): void {
  }

}
