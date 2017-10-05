import { Component } from '@angular/core';
import { DocumentService } from '../services/documentService';
import './impactmap.html'

@Component({
    selector: 'impactMapping',
    templateUrl: './impactmap.html'
})
export class ImpactMapComponent {

    constructor(public docService:DocumentService) {

    }
 }