import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  id: string;
  originalDocument: Document; //don't think I need this
  document: Document; // don't think I need this 
  editMode: boolean = false;
  documentForm: FormGroup;

  constructor(private documentService: DocumentService, private route: ActivatedRoute, private router: Router) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id']
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }


  private initForm() {

    let documentName = '';
    let documentDescription = '';
    let documentURL = '';

    if (this.editMode) {
      const document = this.documentService.getDocument(this.id)
      documentName = document.name;
      documentDescription = document.description;
      documentURL = document.url;
    }

    this.documentForm = new FormGroup({
      'name': new FormControl(documentName, Validators.required),
      'description': new FormControl(documentDescription),
      'url': new FormControl(documentURL, Validators.required)
    })


  }

  ngOnInit(): void {
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  //Because we could be adding or updating a form
  onSubmitDocument() {

    const newDocument = new Document(
      this.id, // the id of the document
      this.documentForm.value['name'],
      this.documentForm.value['description'],
      this.documentForm.value['url'],
      null); //children of the document

    if (this.editMode) {
      console.log('You have tried to update a document');
      this.documentService.updateDocument(this.id, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.onCancel();
  }

}
