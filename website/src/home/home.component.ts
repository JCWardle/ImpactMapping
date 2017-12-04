import { Component, NgModule } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import { DocumentService } from '../services/documentService';
import { Router  } from '@angular/router';
import './home.html';

@Component({
    selector: 'home',
    templateUrl: './home.html'
})
export class HomeComponent {
    constructor(private modalService: NgbModal, private docService: DocumentService, private router: Router) {

    }

    open() {
        const modalRef: NgbModalRef = this.modalService.open(CardComponent);
        (<CardComponent>modalRef.componentInstance).heading = "What's your target?";
        (<CardComponent>modalRef.componentInstance).hint = "Deploy our software product 100% faster";
        modalRef.result.then((success) => {
            this.docService.create(success);
            this.router.navigate(['map']);
        }, (fail) => {
            
        });
    }
}