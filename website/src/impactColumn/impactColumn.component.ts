import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from '../card/card.component';
import './impactColumn.html'
import { ICard } from  '../models/ICard';
import { IColumn } from '../models/IColumn';
import { Observable } from 'rxjs';

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

            Observable.timer(10).subscribe(obs => {
                this.drawLines();
            });

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

    public drawLines() {
        let svg:SVGFEOffsetElement = <any>document.getElementById('svg');
        svg.innerHTML = "";
        let cards: ICard[] = [];
        let column: IColumn = this.column;

        while(column !== undefined) {
            cards = cards.concat(column.items);
            column = column.previousColumn;
        }

        for(let card of cards) {
            this.drawLine(card.id, card.attached.id);
        }
    }

    //Returns the x/y co-ordinate at the top left of the object
    private offset(elem: HTMLElement): number[] {
        let result:number[] = [];
        let box = elem.getBoundingClientRect();
        
        result[0] = box.left;
        result[1] = box.top;
        return result;
    }

    private drawLine(right: string, left:string) {
        let svg:SVGFEOffsetElement = <any>document.getElementById('svg');
        let rightDiv: HTMLElement = document.getElementById(right);
        let leftDiv: HTMLElement = document.getElementById(left);
        let newPath: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg',"path");  

        let svgCoord:number[] = this.offset(<any>svg);
        let rightCoord:number[] = this.offset(rightDiv);
        let leftCoord:number[] = this.offset(leftDiv);

        let start: number[] = [
            rightCoord[0] - svgCoord[0],
            rightCoord[1] + rightDiv.offsetHeight / 2 - svgCoord[1]
        ]
        let end: number[] = [
            leftCoord[0] + leftDiv.offsetWidth - svgCoord[0],
            leftCoord[1] + leftDiv.offsetHeight / 2 - svgCoord[1]
        ]

        let path = this.drawPath(svg, newPath, start, end);

        svg.appendChild(path);
    }

    private drawPath(svg:SVGFEOffsetElement, path:SVGPathElement, start:number[], end:number[]): SVGPathElement {
        let stroke:number = 10;

        let halfX:number = Math.abs((end[0] - start[0]) / 2);
        path.setAttribute("d",  "M"  + end[0] + " " + end[1] +
            " H" + (end[0] + halfX) +
            " V" + start[1] +
            " H" + start[0]
        );

        return path;
    }

    private signum(x:number):number {
        return (x < 0) ? -1 : 1;
    }

    public labelText(card: ICard): string {
        return this.column.addLabel.replace('<previous>', card.heading);
    }
 }