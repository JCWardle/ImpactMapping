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

    public drawLines() {
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
            rightCoord[1] + rightDiv.offsetHeight - svgCoord[1]
        ]
        let end: number[] = [
            leftCoord[0] + leftDiv.offsetWidth - svgCoord[0],
            leftCoord[1] - leftDiv.offsetHeight - svgCoord[1]
        ]

        let path = this.drawPath(svg, newPath, start, end);

        svg.appendChild(path);
    }

    private drawPath(svg:SVGFEOffsetElement, path:SVGPathElement, start:number[], end:number[]): SVGPathElement {
        let stroke:number = 10;

        let deltaX:number = (end[0] - start[0]) * 0.15;
        let deltaY:number = (end[1] - start[1]) * 0.15;

        let delta:number = deltaY < Math.abs(deltaX) ? deltaY: Math.abs(deltaX);

        var arc1 = 0; 
        var arc2 = 1;

        if (start[0] > end[0]) {
            arc1 = 1;
            arc2 = 0;
        }

        path.setAttribute("d",  "M"  + start[0] + " " + start[1] +
        " V" + (start[1] + delta) +
        " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (start[0] + delta* this.signum(deltaX)) + " " + (start[1] + 2*delta) +
        " H" + (end[0] - delta* this.signum(deltaX)) + 
        " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + end[0] + " " + (start[1] + 3*delta) +
        " V" + end[1] );

        return path;
    }

    private signum(x:number):number {
        return (x < 0) ? -1 : 1;
    }

    public labelText(card: ICard): string {
        return this.column.addLabel.replace('<previous>', card.heading);
    }
 }