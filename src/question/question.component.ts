import { Component, OnInit, NgModule } from '@angular/core';
import './question.html'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DocumentService } from '../services/documentService';

@Component({
    selector: 'question',
    templateUrl: './question.html'
})
export class QuestionComponent implements OnInit {
    closeResult:string = "";
    targetForm: FormGroup;
    
    constructor(private modal: NgbModal, private documentService: DocumentService) {
        
    }

    ngOnInit() {
        this.targetForm = new FormGroup({
            target: new FormControl()
        });
    }

    open(content) {
        this.modal.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
 }