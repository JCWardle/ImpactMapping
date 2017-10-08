import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import './impactColumn.html'
import { ICard } from  '../models/ICard';
import { IColumn } from '../models/IColumn';

@Component({
    selector: 'impactColumn',
    templateUrl: './impactColumn.html'
})
export class ImpactColumnComponent implements OnInit {
    @Input() public column: IColumn

    constructor(private modalService: NgbModal) {
    }

    public ngOnInit() {
    }

    public add(previous:ICard) {
        const modalRef: NgbModalRef = this.modalService.open(CardComponent);
        console.log((<CardComponent>modalRef.componentInstance));
        (<CardComponent>modalRef.componentInstance).heading = this.column.heading;
        (<CardComponent>modalRef.componentInstance).hint = this.column.hint;
        modalRef.result.then((success) => {
            success.attached = previous;
            this.column.items.push(success);
        }, (fail) => {
            
        });
    }

    public groupCards(cardGroup: ICard) {
        let result: ICard[] = [];

        for(let card of this.column.items) {
            if(card.attached == cardGroup) {
                result.push(card);
            }
        }

        return result;
    }
 }