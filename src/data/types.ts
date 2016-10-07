import { CollectionInsertOneOptions, CollectionOptions } from 'mongodb';
import { NodeCallback, VoidNodeCallback, Paging } from '../common';

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
    mapResults(record: MongoRecord, callback: NodeCallback<T>): void;
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

export interface MongoRecord {
    [key: string]: any
}



//  MONGOOSE INTERFACES
// import { Model, Document } from 'mongoose';
// export interface QueryBase<T extends Document> {
// 	model: Model<T>;
// 	fields?: Object;
// 	options?: Object;
// 	populate?: string[];
// }

// export interface QueryById<T extends Document> extends QueryBase<T> {
// 	id: string;
// }

// export interface Query<T extends Document> extends QueryBase<T> {
// 	condition: Object;
// }

// export interface DbWrite<T extends Document> {
// 	model: Model<T>;
// 	data: T;
// }

// export interface DbWriteById<T extends Document> extends DbWrite<T>, QueryById<T> {
// }