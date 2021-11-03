import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor() { }

  messages: Message[] = [
    new Message(1, "Want to meet?", "Hey, I was wondering if you want to get together after class to do homework. Does that sound good to you?", "Aaron H."),
    new Message(2, "Want to meet?", "Yeah, that sounds good. Then we can finish the project.", "Cierra M."),
    new Message(3, "Combining Teams", " Brother Thayne said we need to join teams.", "Bobby S.")
  ]

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
