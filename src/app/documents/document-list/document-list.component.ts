import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() documentSelectedEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, "CIT 260 - Object Oriented Programming", "This is the Object Oriented Programming document", "../", null),
    new Document(2, "CIT 366 - Web Full-Stack Development", "This is the Web-Full Stack Development document", "../", null),
    new Document(3, "CIT 425 - Data Warehousing", "This is the Data Warehousing  document", "../", null),
    new Document(4, "CIT 460 - Enterprise Development", "This is the Enterprise Development document", "../", null),
    new Document(5, "CIT 495 - Semior Practicum", "This is the  document", "../", null)
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    //console.log("Contact was selected in the document-list component");
    this.documentSelectedEvent.emit(document);
  }

}

