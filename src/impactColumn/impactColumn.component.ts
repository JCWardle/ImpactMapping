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

        this.drawLines();

        return result;
    }

    private drawLines() {
        for(let card of this.column.items) {
            this.drawLine(card.id, card.attached.id);
        }
    }

    //Returns the x/y co-ordinate at the top left of the object
    private offset(elem: HTMLElement): number[] {
        let result:number[] = [];
        let box = elem.getBoundingClientRect();
        
        result[0] = box.left + window.pageXOffset - elem.clientLeft;
        result[1] = box.top + window.pageYOffset - elem.clientTop;
        return result;
    }

    private drawLine(first: string, second:string) {
        let svg:SVGFEOffsetElement = <any>document.getElementById('svg');
        let firstDiv: HTMLElement = document.getElementById(first);
        let secondDiv: HTMLElement = document.getElementById(second);

        let svgCoord:number[] = this.offset(<any>svg);
        let firstCoord:number[] = this.offset(firstDiv);
        let secondCoord:number[] = this.offset(secondDiv);

        let start: number[] = [
            firstCoord[0] + 0.5 * firstDiv.offsetWidth - svg[0],
            firstCoord[1] + 0.5 * firstDiv.offsetHeight - svg[1]
        ]
        let end: number[] = [
            secondCoord[0] + 0.5 * secondDiv.offsetWidth - svg[0],
            secondCoord[1] + 0.5 * secondDiv.offsetHeight - svg[1]
        ]
    }

    public labelText(card: ICard): string {
        return this.column.addLabel.replace('<previous>', card.heading);
    }
 }