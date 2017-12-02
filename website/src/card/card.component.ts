import { Component, OnInit, NgModule, Input } from '@angular/core';
import './card.html'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ICard } from '../models/ICard';

@Component({
    selector: 'card',
    templateUrl: './card.html'
})
export class CardComponent implements OnInit {
    @Input() heading:string;
    @Input() hint:string;

    public card: ICard;
    form: FormGroup;
    
    constructor(private activeModal: NgbActiveModal) {
        console.log('heading');
        console.log(this.heading);
    }

    close() {
        let result:ICard = {
            heading: this.form.controls.heading.value,
            id: Math.random().toString(36).substr(2, 9)
        };
        this.activeModal.close(result)
    }

    ngOnInit() {
        this.form = new FormGroup({
            heading: new FormControl()
        });
    }
 }