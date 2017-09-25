import { IColumnItem } from '../models/IColumnItem';

export class DocumentService {
    public target:IColumnItem = { heading: "" };
    public who: IColumnItem[];
    public what: IColumnItem[];
    public how: IColumnItem[];

    constructor() {

    }
}