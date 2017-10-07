import { IColumn } from '../models/IColumn';

export class DocumentService {
    public columns: IColumn[]

    constructor() {
        this.columns = [];
    }
}