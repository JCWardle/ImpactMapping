import { Injectable } from '@angular/core';
import { IColumn } from '../models/IColumn';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentService {
    public columns: IColumn[];
    public id: string;

    private API_URL: string = "http://localhost:3000/api/";

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


            this.columns = data.impactmap;
        });
    }
}