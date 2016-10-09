import { Injectable, Inject } from 'aramsay-injector';
import { MongoClient, Db } from 'mongodb';
import { map } from 'async';

import { DbFind, DbDelete, DbInsert, DbUpdate } from './types';
import { NodeCallback, VoidNodeCallback } from '../common';
import { mongoDbInjectorToken } from '../dependency-injection/framework-module';

@Injectable({ singleton: true })
export class DatabaseExecutor {
    constructor(
        @Inject(mongoDbInjectorToken) private db: Db) {
    }

    deleteMany(query: DbDelete, callback: VoidNodeCallback): void {
        let collection = this.db.collection(query.collection);
        collection.deleteMany(query.filter, query.options, callback);
    }

    deleteOne(query: DbDelete, callback: VoidNodeCallback): void {
        let collection = this.db.collection(query.collection)
        collection.deleteOne(query.filter, query.options, callback);
    }

    findMany<T>(query: DbFind<T>, callback: NodeCallback<T[]>): void {
        let collection = this.db.collection(query.collection);
        let cursor = collection.find(query.filter);
        if (query.fields) {
            cursor = cursor.project(query.fields);
        }

        if (query.paging) {
            cursor = cursor.skip(query.paging.offset).limit(query.paging.limit);
        }

        cursor.toArray((err, records) => {
            if (err) { return callback(err); }
            map<any, T>(records, (rec, cb) => query.mapResults(rec, cb), callback);
        });
    }

    findOne<T>(query: DbFind<T>, callback: NodeCallback<T>): void {
        let collection = this.db.collection(query.collection);
        let cursor = collection.find(query.filter);
        if (query.fields) {
            cursor = cursor.project(query.fields);
        }

        cursor.limit(1).next((err, record) => {
            if (err) { return callback(err); }
            query.mapResults(record, callback);
        });
    }

    insert(insert: DbInsert, callback: VoidNodeCallback): void {
        let collection = this.db.collection(insert.collection);
        if (insert.documents.length > 1) {
            collection.insertMany(insert.documents, insert.options, callback);
        } else {
            collection.insertOne(insert.documents[0], insert.options, callback);
        }
    }

    update(update: DbUpdate, callback: VoidNodeCallback): void {
        let collection = this.db.collection(update.collection);
        if (update.documents.length > 1) {
            collection.updateMany(update.filter, update.documents, update.options, callback);
        } else {
            collection.updateOne(update.filter, update.documents[0], update.options, callback);
        }
    }
}
