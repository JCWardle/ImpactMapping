import { Injectable } from '@angular/core';
import { IColumn } from '../models/IColumn';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//API endpoint configuration from webpack define
declare var API: string;

@Injectable()
export class DocumentService {
    public columns: IColumn[];
    public id: string;

    private API_URL: string = API;

    constructor(private http: HttpClient) {
        this.columns = [];
    }

    save(): Observable<any> {
        if(this.id == null) { 
            let obs:Observable<any> = this.http.post(this.API_URL + 'impactmap', {
                impactmap: this.columns
            });
            obs.subscribe(data => {
                this.id = data.id;
            });

            return obs;
        } else {
            return this.http.put(this.API_URL + 'impactmap/' + this.id, {
                impactmap: this.columns
            });
        }
    }

    load(id:any) {
        return this.http.get(this.API_URL + 'impactmap/' + id).subscribe((data:any) => {
            let columns: IColumn[] = [];
            let impactmap: Array<IColumn> = data.impactmap;
            let previousColumn: IColumn = undefined;

            for(let column of impactmap) {
                if(previousColumn === undefined) {
                    previousColumn = column;
                    columns.push(column);
                    continue;
                }
                column.previousColumn = previousColumn;

                for(let card of column.items) {
                    if(card.attached === undefined) {
                        continue;
                    }

                    for(let previousCard of previousColumn.items) {
                        if(card.attached.id == previousCard.id) {
                            card.attached = previousCard;
                            break;
                        }
                    }
                }
                columns.push(column);
                previousColumn = column;
            }

            this.columns = columns;
        });
    }
}