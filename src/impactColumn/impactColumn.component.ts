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
    @Input() public deleteable: boolean;
    @Input() public heading: string;
    @Input() public hint: string;

    private columnItems: IColumnItem[];

    constructor(private modalService: NgbModal) {
        console.log(this.items);
    }

    public ngOnInit() {
        this.columnItems = this.items;
    }

    public add() {
        const modalRef: NgbModalRef = this.modalService.open(CardComponent);
        console.log((<CardComponent>modalRef.componentInstance));
        (<CardComponent>modalRef.componentInstance).heading = this.heading;
        (<CardComponent>modalRef.componentInstance).hint = this.hint;
        modalRef.result.then((success) => {
            this.items.push(success);
        }, (fail) => {
            
        });
    }
 }