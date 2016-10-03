import { Document } from 'mongoose';
import { DbWrite, DbWriteById, Query, QueryById } from './types';
import { NodeCallback, VoidNodeCallback } from '../common';
export declare class DatabaseExecutor {
    findMany<T extends Document>(query: Query<T>, callback: NodeCallback<T[]>): void;
    findById<T extends Document>(query: QueryById<T>, callback: NodeCallback<T>): void;
    findOne<T extends Document>(query: Query<T>, callback: NodeCallback<T>): void;
    saveData<T extends Document>(write: DbWrite<T>, callback: NodeCallback<string | number>): void;
    updateRecordById<T extends Document>(query: DbWriteById<T>, callback: NodeCallback<T>): void;
    deleteRecords<T extends Document>(query: Query<T>, callback: VoidNodeCallback): void;
    deleteRecordById<T extends Document>(query: QueryById<T>, callback: VoidNodeCallback): void;
    private runQuery<T>(query, mongooseQuery, callback);
}
