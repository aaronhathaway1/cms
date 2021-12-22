import { Component, OnDestroy, OnInit } from '@angular/core';

import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[];
  private subscription: Subscription;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.documentService.documentsChanged
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )

    this.documents = this.documentService.getDocuments();

    // this.docChangedSub = this.documentService.documentChangedEvent.subscribe(
    //   (documents: Document[]) => { this.documents = documents }
    // )
  }

  onNewDocument() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

