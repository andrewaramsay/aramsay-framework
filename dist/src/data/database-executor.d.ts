import { Document } from 'mongoose';
import { DbWrite, DbWriteById, Query, QueryById } from './types';
import { NodeCallback, VoidNodeCallback } from '../common';
export declare class DatabaseExecutor {
    deleteRecordById<T extends Document>(query: QueryById<T>, callback: VoidNodeCallback): void;
    deleteRecords<T extends Document>(query: Query<T>, callback: VoidNodeCallback): void;
    findById<T extends Document>(query: QueryById<T>, callback: NodeCallback<T>): void;
    findMany<T extends Document>(query: Query<T>, callback: NodeCallback<T[]>): void;
    findOne<T extends Document>(query: Query<T>, callback: NodeCallback<T>): void;
    saveData<T extends Document>(write: DbWrite<T>, callback: NodeCallback<string | number>): void;
    updateRecordById<T extends Document>(query: DbWriteById<T>, callback: NodeCallback<T>): void;
    private runQuery<T>(query, mongooseQuery, callback);
}
