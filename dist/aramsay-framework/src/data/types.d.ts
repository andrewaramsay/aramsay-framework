import { CollectionInsertOneOptions, CollectionOptions } from 'mongodb';
import { NodeCallback, Paging } from '../common';
export interface DbDelete {
    collection: string;
    filter: Object;
    options: CollectionOptions;
}
export interface DbFind<T> {
    collection: string;
    filter?: Object;
    fields?: Object;
    paging?: Paging;
    mapResults(record: any, callback: NodeCallback<T>): void;
}
export interface DbInsert {
    collection: string;
    documents: Object[];
    options: CollectionInsertOneOptions;
}
export interface DbUpdate {
    collection: string;
    documents: Object[];
    filter: Object;
    options: CollectionUpdateOptions;
}
export interface CollectionUpdateOptions {
    upsert?: boolean;
    w?: number | string;
    wtimeout?: number;
    j?: boolean;
    bypassDocumentValidation?: boolean;
}
