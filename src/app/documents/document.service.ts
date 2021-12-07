import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();

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

  deleteDocument(document: Document) {

    console.log(document);

    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocId++;
    newDocument.id = this.maxDocId.toString();
    this.documents.push(newDocument);
    this.documentsClone = this.documents.slice();
    this.documentChangedEvent.next(this.documentsClone);

  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    this.pos = this.documents.indexOf(originalDocument);
    if (this.pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[this.pos] = newDocument;
    this.documentsClone = this.documents.slice();
    this.documentChangedEvent.next(this.documentsClone);
  }

}

