import { Component, Input, OnInit } from '@angular/core';
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

    constructor() {
        console.log(this.items);
    }

    public ngOnInit() {
        this.columnItems = this.items;
    }
 }