import { NodeCallback, VoidNodeCallback } from '../common';
import { Db } from 'mongodb';
import { DbFind, DbDelete, DbInsert, DbUpdate } from './types';
export declare const mongoDbInjectorToken: string;
export declare class DatabaseExecutor {
    private db;
    constructor(db: Db);
    deleteMany(query: DbDelete, callback: VoidNodeCallback): void;
    deleteOne(query: DbDelete, callback: VoidNodeCallback): void;
    findMany<T>(query: DbFind<T>, callback: NodeCallback<T[]>): void;
    findOne<T>(query: DbFind<T>, callback: NodeCallback<T>): void;
    insert(insert: DbInsert, callback: VoidNodeCallback): void;
    update(update: DbUpdate, callback: VoidNodeCallback): void;
}
