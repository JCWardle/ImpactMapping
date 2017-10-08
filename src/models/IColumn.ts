import { ICard } from './ICard';

export interface IColumn {
    items: ICard[],
    name: string,
    deleteable: boolean,
    heading: string,
    hint: string,
    previousColumn?: IColumn,
    addLabel?: string
}