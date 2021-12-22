import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  documentsChanged = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new Subject<Document[]>();

  private documents: Document[];
  private maxDocId: number;
  private currentDocId: number;
  private documentsClone: Document[];
  private pos: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocId = this.getMaxDocId();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxDocId(): number {
    this.maxDocId = 0;

    for (let i = 0; i < this.documents.length; i++) {
      const document = this.documents[i];
      this.currentDocId = +document.id;

      if (this.currentDocId > this.maxDocId) {
        this.maxDocId = this.currentDocId
      }
    }

    return this.maxDocId
  }

  updateDocument(index: string, newDocument: Document) {
    if (!index || !newDocument) {
      return;
    }

    // Getting the old document
    const oldDocument = this.getDocument(index);

    //Finding the position in the documents array of the old document
    // Because id and position do not correspond
    const position = this.documents.indexOf(oldDocument);

    //Assigning the id of the old document to the new one.
    newDocument.id = index;

    //Assigning the new document to the position of the old
    // Essentially overwriting the now outdated array
    this.documents[position] = newDocument;
    console.log(position);
    console.log(1);

    //Telling emitting an event with a copy of the documents array
    this.documentsChanged.next(this.documents.slice());
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocId++;
    newDocument.id = this.maxDocId.toString();
    this.documents.push(newDocument);
    this.documentsChanged.next(this.documents.slice());
  }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentsChanged.next(this.documents.slice());
  }
}

