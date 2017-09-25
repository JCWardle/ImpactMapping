import { Component, NgModule } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import './home.html'

@Component({
    selector: 'home',
    templateUrl: './home.html'
})
export class HomeComponent {
    constructor(private modalService: NgbModal) {

    }

    open() {
        const modalRef: NgbModalRef = this.modalService.open(CardComponent);
        (<CardComponent>modalRef.componentInstance).heading = "What's your target?";
        (<CardComponent>modalRef.componentInstance).hint = "Deploy our software product 100% faster";

        modalRef.result.then((result) => {
            console.log(result);
        });
    }
}