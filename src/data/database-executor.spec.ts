/// <reference path="../../typings/index.d.ts" />
import { Document, Schema, model, Model, Query as MongooseQuery } from 'mongoose';
import Spy = jasmine.Spy;

import { DatabaseExecutor } from './database-executor';
import { Query, QueryById, DbWrite, DbWriteById } from './types';
import { NodeCallback } from '../common';
import { callCallback } from '../testing';


describe('DatabaseExecutor', () => {
    let target: DatabaseExecutor;
    let callback: NodeCallback<any>

    beforeEach(() => {
        target = new DatabaseExecutor();
        target.updateRecordById;

        callback = jasmine.createSpy('callback');
    });

    describe('deleteRecordById', () => {
        let findByIdAndRemove: Spy;
        let queryById: FindSampleById;
        
        beforeEach(() => {
            findByIdAndRemove = spyOn(SampleModel, 'findByIdAndRemove');
            queryById = new FindSampleById();
        })
        
        it('calls findIdAndRemove on the model', () => {
            queryById.id = 'foo';
            queryById.options = { this: 'is options' };
            
            target.deleteRecordById(queryById, callback);
            
            expect(findByIdAndRemove).toHaveBeenCalledWith('foo', { this: 'is options' }, callback);
        });
    });
    
    describe('deleteRecords', () => {
        let remove: Spy;
        let query: FindSample;

        beforeEach(() => {
            remove = spyOn(SampleModel, 'remove');
            query = new FindSample();
        });

        it('calls remove on the model', () => {
            query.condition = { this: 'is a condition' };

            target.deleteRecords(query, callback);

            expect(remove).toHaveBeenCalledWith({ this: 'is a condition' }, callback);
        });
    });
    
    describe('findById', () => {
        let findById: Spy;
        let queryById: FindSampleById;
        let mongooseQuery: MongooseQuery<Sample>;

        beforeEach(() => {
            queryById = new FindSampleById();
            mongooseQuery = jasmine.createSpyObj<MongooseQuery<Sample>>('mongooseQuery', ['exec', 'populate']);
            (<Spy>mongooseQuery.populate).and.returnValue(mongooseQuery);

            findById = spyOn(SampleModel, 'findById').and.returnValue(mongooseQuery);
        });

        it('calls findById on the model', () => {
            queryById.id = 'foo';
            queryById.options = { this: 'is options' };
            queryById.fields = { this: 'is fields' };
            
            target.findById(queryById, callback);
            
            expect(findById).toHaveBeenCalledWith('foo', { this: 'is fields' }, { this: 'is options' });
        });

        it('calls populate for any properties specified in populate', () => {
            queryById.populate = ['prop1', 'prop2'];

            target.findById(queryById, callback);

            expect(mongooseQuery.populate).toHaveBeenCalledTimes(2);
            expect(mongooseQuery.populate).toHaveBeenCalledWith('prop1');
            expect(mongooseQuery.populate).toHaveBeenCalledWith('prop2');
        });

        it('passes the callback to exec on the mongooseQuery', () => {
            target.findById(queryById, callback);

            expect(mongooseQuery.exec).toHaveBeenCalledWith(callback);
        });
    });
    
    describe('findMany', () => {
        let find: Spy;
        let query: FindSample;
        let mongooseQuery: MongooseQuery<Sample>;

        beforeEach(() => {
            query = new FindSample();
            mongooseQuery = jasmine.createSpyObj<MongooseQuery<Sample>>('mongooseQuery', ['exec', 'populate']);
            (<Spy>mongooseQuery.populate).and.returnValue(mongooseQuery);

            find = spyOn(SampleModel, 'find').and.returnValue(mongooseQuery);
        });

        it('calls find on the model', () => {
            query.condition = { this: 'is condition' };
            query.options = { this: 'is options' };
            query.fields = { this: 'is fields' };
            
            target.findMany(query, callback);
            
            expect(find).toHaveBeenCalledWith({ this: 'is condition' }, { this: 'is fields' }, { this: 'is options' });
        });

        it('calls populate for any properties specified in populate', () => {
            query.populate = ['prop1', 'prop2'];

            target.findMany(query, callback);

            expect(mongooseQuery.populate).toHaveBeenCalledTimes(2);
            expect(mongooseQuery.populate).toHaveBeenCalledWith('prop1');
            expect(mongooseQuery.populate).toHaveBeenCalledWith('prop2');
        });

        it('passes the callback to exec on the mongooseQuery', () => {
            target.findMany(query, callback);

            expect(mongooseQuery.exec).toHaveBeenCalledWith(callback);
        });
    });
    
    describe('findOne', () => {
        let findOne: Spy;
        let query: FindSample;
        let mongooseQuery: MongooseQuery<Sample>;

        beforeEach(() => {
            query = new FindSample();
            mongooseQuery = jasmine.createSpyObj<MongooseQuery<Sample>>('mongooseQuery', ['exec', 'populate']);
            (<Spy>mongooseQuery.populate).and.returnValue(mongooseQuery);

            findOne = spyOn(SampleModel, 'findOne').and.returnValue(mongooseQuery);
        });

        it('calls find on the model', () => {
            query.condition = { this: 'is condition' };
            query.options = { this: 'is options' };
            query.fields = { this: 'is fields' };
            
            target.findOne(query, callback);
            
            expect(findOne).toHaveBeenCalledWith({ this: 'is condition' }, { this: 'is fields' }, { this: 'is options' });
        });

        it('calls populate for any properties specified in populate', () => {
            query.populate = ['prop1', 'prop2'];

            target.findOne(query, callback);

            expect(mongooseQuery.populate).toHaveBeenCalledTimes(2);
            expect(mongooseQuery.populate).toHaveBeenCalledWith('prop1');
            expect(mongooseQuery.populate).toHaveBeenCalledWith('prop2');
        });

        it('passes the callback to exec on the mongooseQuery', () => {
            target.findOne(query, callback);

            expect(mongooseQuery.exec).toHaveBeenCalledWith(callback);
        });
    });
    
    describe('saveData', () => {
        let save: Spy;
        let dbWrite: UpdateSample;
        let SpySampleModel: Spy;

        beforeEach(() => {
            SpySampleModel = jasmine.createSpy('SampleModel', SampleModel);
            dbWrite = new UpdateSample();
            dbWrite.model = <any>SpySampleModel;

            save = jasmine.createSpy('save');
            SpySampleModel.and.returnValue({ save });
        });

        it('instantiates the model with the supplied data', () => {
            dbWrite.data = <Sample>{ thing: 25, };

            target.saveData(dbWrite, callback);

            expect(SpySampleModel).toHaveBeenCalledWith({ thing: 25 });
        });

        it('calls save on the model instance', () => {
            target.saveData(dbWrite, callback);
            
            expect(save).toHaveBeenCalled();
        });

        it('calls the callback with errors from save', () => {
            let err = new Error('something broke');
            
            save.and.callFake(callCallback(0, err));

            target.saveData(dbWrite, callback);

            expect(callback).toHaveBeenCalledWith(err, undefined);
        });

        it('calls the callback with record id from save', () => {
            let record = { id: 'my id' };
            
            save.and.callFake(callCallback(0, null, record));

            target.saveData(dbWrite, callback);

            expect(callback).toHaveBeenCalledWith(null, 'my id');
        });

        it('calls the callback with nothing when no record is returned', () => {
            save.and.callFake(callCallback(0));

            target.saveData(dbWrite, callback);

            expect(callback).toHaveBeenCalledWith(undefined, undefined);
        });
    });

    describe('updateRecordById', () => {
        let findByIdAndUpdate: Spy;
        let dbWriteById: UpdateSampleById;
        
        beforeEach(() => {
            findByIdAndUpdate = spyOn(SampleModel, 'findByIdAndUpdate');
            dbWriteById = new UpdateSampleById();
        })
        
        it('calls findByIdAndUpdate on the model', () => {
            dbWriteById.id = 'foo';
            dbWriteById.data = <Sample>{ thing: 25, };
            dbWriteById.options = { this: 'is options' };
            
            target.updateRecordById(dbWriteById, callback);
            
            expect(findByIdAndUpdate).toHaveBeenCalledWith('foo', { thing: 25, }, { this: 'is options' }, callback);
        });
    });
});

// NOTE: Do not use these queries as example queries.  They are built to have poor abstraction to support easier
// testing of the DatabaseExecutor class.
interface Sample extends Document {
    thing: number;
}

const SampleSchema = new Schema({
    thing: { type: Number }
})

const SampleModel = model<Sample>('Sample', SampleSchema);

class FindSampleById implements QueryById<Sample> {
    id: string;
    options: Object;
    fields: Object;
    populate: string[];
    
    get model() {
        return SampleModel;
    }
}

class FindSample implements Query<Sample> {
    condition: Object;
    options: Object;
    fields: Object;
    populate: string[];

    get model() {
        return SampleModel;
    }
}

class UpdateSample implements DbWrite<Sample> {
    data: Sample;
    model: Model<Sample>;
}

class UpdateSampleById implements DbWriteById<Sample> {
    data: Sample;
    model = SampleModel;
    options: Object;
    id: string;
}