import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import './impactColumn.html'
import { IColumnItem } from  '../models/IColumnItem';

@Component({
    selector: 'impactColumn',
    templateUrl: './impactColumn.html'
})
export class ImpactColumnComponent implements OnInit {
    @Input() public items: IColumnItem[];
    @Input() public name: string;

    private columnItems: IColumnItem[];

    constructor(private modalService: NgbModal) {
        console.log(this.items);
    }

    public ngOnInit() {
        this.columnItems = this.items;
    }

    public add() {
        const modalRef: NgbModalRef = this.modalService.open(CardComponent);
        (<CardComponent>modalRef.componentInstance).heading = "What's your target?";
        (<CardComponent>modalRef.componentInstance).hint = "Deploy our software product 100% faster";
        modalRef.result.then((success) => {
            this.items.push(success);
        }, (fail) => {
            
        });
    }
 }