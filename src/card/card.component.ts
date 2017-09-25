import { Component, OnInit, NgModule, Input } from '@angular/core';
import './card.html'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IColumnItem } from '../models/IColumnItem';

@Component({
    selector: 'card',
    templateUrl: './card.html'
})
export class CardComponent implements OnInit {
    @Input() heading:string;
    @Input() hint:string;

    public card: IColumnItem;
    form: FormGroup;
    
    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            heading: new FormControl()
        });
    }
 }