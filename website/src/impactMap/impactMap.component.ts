import { Component } from '@angular/core';
import { DocumentService } from '../services/documentService';
import './impactmap.html';
import { IColumn } from '../models/IColumn';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'impactMapping',
    templateUrl: './impactmap.html'
})
export class ImpactMapComponent implements OnInit {
    constructor(public docService:DocumentService, private router: Router, private activatedRoute: ActivatedRoute) {
        if(docService.columns.length == 1) {
            this.docService.columns.push({
                    name: 'Who',
                    items: [],
                    deleteable: true,
                    heading: 'Who can influence your target?',
                    hint: 'Developers',
                    addLabel: 'Who else can influence your target?'
                });
            this.docService.columns.push({
                    name: 'How',
                    items: [],
                    deleteable: true,
                    heading: 'How can this actor influence your target?',
                    hint: 'Deploy without any down time',
                    addLabel: 'How can <previous> help move closer to the target?'
                });
            this.docService.columns.push({
                    name: 'What',
                    items: [],
                    deleteable: true,
                    heading: 'What can we do to make our how happen?',
                    hint: 'Add a load balancer',
                    addLabel: 'What needs to happen to <previous>'
                });

            for(let c in this.docService.columns) {
                let index = Number.parseInt(c);
                if(index == 0) {
                    continue;
                }

                this.docService.columns[index].previousColumn = this.docService.columns[index - 1];
            }
        }
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params.id !== undefined) {
                this.docService.load(params.id);
            }
        });
    }

    save() {
        this.docService.save().subscribe(data => {
            this.router.navigate(['/map'], {queryParams: { id: data.id }});
        });
    }
 }