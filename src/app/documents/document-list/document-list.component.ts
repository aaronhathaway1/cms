import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[];

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => { this.documents = documents }
    )
  }

  onNewDocument() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}

