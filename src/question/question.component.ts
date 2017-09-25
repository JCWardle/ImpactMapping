import { Component, OnInit, NgModule } from '@angular/core';
import './question.html'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../services/documentService';

@Component({
    selector: 'question',
    templateUrl: './question.html'
})
export class QuestionComponent implements OnInit {
    targetForm: FormGroup;
    
    constructor(private modal: NgbModal, private documentService: DocumentService, private router: Router) {
        
    }

    ngOnInit() {
        this.targetForm = new FormGroup({
            target: new FormControl()
        });
    }

    open(content) {
        this.modal.open(content).result.then((result) => {
            this.documentService.target.heading = this.targetForm.controls.target.value;
            this.router.navigate(['map']);
        }, (reason) => {
            
        });
    }
 }