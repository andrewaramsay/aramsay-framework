import { Injectable } from 'aramsay-injector';
import { Model, Document } from 'mongoose';
import { DbWrite, DbWriteById, Query, QueryBase, QueryById } from './types';
import { NodeCallback, VoidNodeCallback } from '../common';

@Injectable()
export class DatabaseExecutor {
  findMany<T extends Document>(query: Query<T>, callback: NodeCallback<T[]>) {
    const self = this;
    let Model = query.model;
    let mongooseQuery = Model.find(query.condition, query.fields, query.options);
    self.runQuery(query, mongooseQuery, callback);
  }

  findById<T extends Document>(query: QueryById<T>, callback: NodeCallback<T>) {
    const self = this;
    let Model = query.model;
    let mongooseQuery = Model.findById(query.id, query.fields, query.options);
    self.runQuery(query, mongooseQuery, callback);
  }

  findOne<T extends Document>(query: Query<T>, callback: NodeCallback<T>) {
    const self = this;
    let Model = query.model;
    let mongooseQuery = Model.findOne(query.condition, query.fields, query.options);
    self.runQuery(query, mongooseQuery, callback);
  }

  saveData<T extends Document>(write: DbWrite<T>, callback: NodeCallback<string | number>) {
    let Model = write.model;
    let model = new Model(write.data);
    model.save((err: Error, rec: T) => callback(err, rec && rec.id));
  }

  updateRecordById<T extends Document>(query: DbWriteById<T>, callback: NodeCallback<T>) {
    let Model = query.model;
    Model.findByIdAndUpdate(query.id, query.data, query.options, callback);
  }

  deleteRecords<T extends Document>(query: Query<T>, callback: VoidNodeCallback) {
    let Model = query.model;
    callback();
    Model.remove(query.condition, callback);
  }

  deleteRecordById<T extends Document>(query: QueryById<T>, callback: VoidNodeCallback) {
    let Model = query.model;
    Model.findByIdAndRemove(query.id, query.options, callback);
  }

  private runQuery<T extends Document>(query: QueryBase<T>, mongooseQuery: any, callback: NodeCallback<T | T[]>) {
    for (let property of query.populate || []) {
      mongooseQuery = mongooseQuery.populate(property);
    }
    mongooseQuery.exec(callback);
  }
}
