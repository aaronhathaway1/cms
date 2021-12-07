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
  private docChangedSub: Subscription;

  // Can be deleted soon
  private defaultDoc: Document = {
    id: '1',
    name: 'CIT 425 - Data Warehousing',
    description: 'A sucky class',
    url: 'https://rkjdatawarehousing.wordpress.com/',
  }

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.docChangedSub = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => { this.documents = documents }
    )
  }

  onNewDocument() {
    // this.documentService.addDocument(this.defaultDoc)
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.docChangedSub.unsubscribe();
  }


}

