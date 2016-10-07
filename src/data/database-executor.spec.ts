/// <reference path="../../typings/index.d.ts" />
import { Db, Collection, Cursor, CollectionOptions, CollectionInsertOneOptions } from 'mongodb';
import Spy = jasmine.Spy;

import { DatabaseExecutor } from './database-executor';
import { DbDelete, DbFind, DbInsert, DbUpdate, CollectionUpdateOptions } from './types';
import { NodeCallback, Paging } from '../common';
import { callCallback, spy } from '../testing';

describe('DatabaseExecutor', () => {
    let target: DatabaseExecutor;
    let db: Db;
    let collection: Collection;
    let callback: NodeCallback<any>

    beforeEach(() => {
        callback = jasmine.createSpy('callback');
        db = jasmine.createSpyObj<Db>('db', ['collection'])
        collection = jasmine.createSpyObj<Collection>('collection', ['find', 'insertOne', 'insertMany', 'updateOne', 'updateMany', 'deleteOne', 'deleteMany']);
        
        target = new DatabaseExecutor(db);

        spy(db.collection).and.returnValue(collection);
    });

    describe('deleteMany', () => {
        let deleteSample: DeleteSample

        beforeEach(() => {
            deleteSample = new DeleteSample();    
        });
        
        it('gets the collection from the database', () => {
            deleteSample.collection = 'test collection';

            target.deleteMany(deleteSample, callback);

            expect(db.collection).toHaveBeenCalledWith('test collection');
        });

        it('callls deleteMany on the collection', () => {
            deleteSample.filter = { this: 'is a filter' };
            deleteSample.options = { w: 'this is the options' };
            target.deleteMany(deleteSample, callback);

            expect(collection.deleteMany).toHaveBeenCalledWith({ this: 'is a filter' }, { w: 'this is the options' }, callback);
        });
    });

    describe('deleteOne', () => {
        let deleteSample: DeleteSample

        beforeEach(() => {
            deleteSample = new DeleteSample();    
        });
        
        it('gets the collection from the database', () => {
            deleteSample.collection = 'test collection';

            target.deleteOne(deleteSample, callback);

            expect(db.collection).toHaveBeenCalledWith('test collection');
        });

        it('callls deleteOne on the collection', () => {
            deleteSample.filter = { this: 'is a filter' };
            deleteSample.options = { w: 'this is the options' };
            target.deleteOne(deleteSample, callback);

            expect(collection.deleteOne).toHaveBeenCalledWith({ this: 'is a filter' }, { w: 'this is the options' }, callback);
        });
    });

    describe('find', () => {
        let findSample: FindSample;
        let cursor: Cursor;
        let mapResults: Spy;

        beforeEach(() => {
            cursor = jasmine.createSpyObj<Cursor>('cursor', ['project', 'skip', 'limit', 'next', 'toArray']);
            
            findSample = new FindSample();
            spy(collection.find).and.returnValue(cursor)

            spy(cursor.project).and.returnValue(cursor);
            spy(cursor.skip).and.returnValue(cursor);
            spy(cursor.limit).and.returnValue(cursor);

            mapResults = spyOn(findSample, 'mapResults');
        });
            
        describe('findMany', () => {
            beforeEach(() => {
                spyOn(target, 'findOne').and.throwError('not supposed to be testing findOne here');
            });

            it('gets the collection from the database', () => {
                findSample.collection = 'test collection';

                target.findMany(findSample, callback);

                expect(db.collection).toHaveBeenCalledWith('test collection');
            });

            it('calls find on the collection', () => {
                findSample.filter = { this: 'is the filter' };
                
                target.findMany(findSample, callback);

                expect(collection.find).toHaveBeenCalledWith({ this: 'is the filter' });
            });

            it('calls project with fields if query contains fields', () => {
                findSample.fields = { these: 'are some fields' };

                target.findMany(findSample, callback);

                expect(cursor.project).toHaveBeenCalledWith({ these: 'are some fields' });
            });

            it('does not call project if the query contains no fields', () => {
                findSample.fields = undefined;

                target.findMany(findSample, callback);

                expect(cursor.project).not.toHaveBeenCalled();
            });

            it('calls skip and limit if paging is specified on the query', () => {
                findSample.paging = { limit: 1, offset: 2 };

                target.findMany(findSample, callback);

                expect(cursor.skip).toHaveBeenCalledWith(2);
                expect(cursor.limit).toHaveBeenCalledWith(1);
            });

            it('does not call skip or limit if paging is not specified on the query', () => {
                findSample.paging = undefined;

                target.findMany(findSample, callback);

                expect(cursor.skip).not.toHaveBeenCalled();
                expect(cursor.limit).not.toHaveBeenCalled();
            });

            it('calls toArray on the cursor', () => {
                target.findMany(findSample, callback);

                expect(cursor.toArray).toHaveBeenCalled();
            });

            it('passes only error to callback if toArray returns an error', () => {
                let err = new Error('toArray broke');
                spy(cursor.toArray).and.callFake(callCallback(0, err));
                
                target.findMany(findSample, callback);

                expect(callback).toHaveBeenCalledWith(err);
                expect(mapResults).not.toHaveBeenCalled();
            });

            it('calls mapResults for each record', () => {
                let record1 = { this: 'is record 1' };
                let record2 = { this: 'is record 2' };
                let record3 = { this: 'is record 3' };
                spy(cursor.toArray).and.callFake(callCallback(0, null, [record1, record2, record3]))
                
                target.findMany(findSample, callback);

                expect(mapResults).toHaveBeenCalledTimes(3);
                expect(mapResults).toHaveBeenCalledWith(record1, jasmine.anything());
                expect(mapResults).toHaveBeenCalledWith(record2, jasmine.anything());
                expect(mapResults).toHaveBeenCalledWith(record3, jasmine.anything());
            });

            it('calls callback when all mapResults have returned', () => {
                let record1 = { this: 'is record 1' };
                let record2 = { this: 'is record 2' };
                let record3 = { this: 'is record 3' };
                spy(cursor.toArray).and.callFake(callCallback(0, null, [record1, record2, record3]))

                spy(mapResults).and.callFake((record: any, cb: NodeCallback<Sample>) => {
                    cb(null, record);
                });

                target.findMany(findSample, callback);

                expect(callback).toHaveBeenCalledWith(null, [record1, record2, record3]);
            });

            it('calls callback with error when any mapResults returns an error', () => {
                let err = new Error('record 1 broke');
                let record1 = { this: 'is record 1' };
                let record2 = { this: 'is record 2' };
                let record3 = { this: 'is record 3' };
                spy(cursor.toArray).and.callFake(callCallback(0, null, [record1, record2, record3]))

                spy(mapResults).and.callFake((record: any, cb: NodeCallback<Sample>) => {
                    if (record === record1) {
                        cb(err);
                    } else {
                        cb(null, record);
                    }
                });

                target.findMany(findSample, callback);

                expect(callback).toHaveBeenCalledWith(err, [undefined, record2, record3]);
            });
        });

        describe('findOne', () => {
            beforeEach(() => {
                spyOn(target, 'findMany').and.throwError('not supposed to be testing findMany here');
            });
            
            it('gets the collection from the database', () => {
                findSample.collection = 'test collection';

                target.findOne(findSample, callback);

                expect(db.collection).toHaveBeenCalledWith('test collection');
            });

            it('calls find on the collection', () => {
                findSample.filter = { this: 'is the filter' };
                
                target.findOne(findSample, callback);

                expect(collection.find).toHaveBeenCalledWith({ this: 'is the filter' });
            });

            it('calls project with fields if query contains fields', () => {
                findSample.fields = { these: 'are some fields' };

                target.findOne(findSample, callback);

                expect(cursor.project).toHaveBeenCalledWith({ these: 'are some fields' });
            });

            it('does not call project if the query contains no fields', () => {
                findSample.fields = undefined;

                target.findOne(findSample, callback);

                expect(cursor.project).not.toHaveBeenCalled();
            });

            it('calls limit on the cursor', () => {
                target.findOne(findSample, callback);

                expect(cursor.limit).toHaveBeenCalledWith(1);
            });

            it('calls next on the cursor', () => {
                target.findOne(findSample, callback);

                expect(cursor.next).toHaveBeenCalled();
            });

            it('passes only error to callback if next returns an error', () => {
                let err = new Error('next broke');
                spy(cursor.next).and.callFake(callCallback(0, err));
                
                target.findOne(findSample, callback);

                expect(callback).toHaveBeenCalledWith(err);
                expect(mapResults).not.toHaveBeenCalled();
            });

            it('calls mapResults with the record and callback', () => {
                let record = { this: 'is the record' };
                spy(cursor.next).and.callFake(callCallback(0, null, record));
                
                target.findOne(findSample, callback);

                expect(mapResults).toHaveBeenCalledWith(record, callback);
            });
        });
    });

    describe('insert', () => {
        let insertSample: InsertSample;

        beforeEach(() => {
            insertSample = new InsertSample();
        });
        
        it('gets the collection from the database', () => {
            insertSample.collection = 'test collection';

            target.insert(insertSample, callback);

            expect(db.collection).toHaveBeenCalledWith('test collection');
        });

        it('calls insertOne when query contains one document', () => {
            insertSample.documents = [{ one: 'document' }];
            insertSample.options = { w: 'this is the options' };

            target.insert(insertSample, callback);

            expect(collection.insertOne).toHaveBeenCalledWith({ one: 'document' }, { w: 'this is the options' }, callback);
        });

        it('calls insertMany when query contains multiple documents', () => {
            insertSample.documents = [{ one: 'document' }, { another: 'document' }];
            insertSample.options = { w: 'this is the options' };

            target.insert(insertSample, callback);

            expect(collection.insertMany).toHaveBeenCalledWith([{ one: 'document' }, { another: 'document' }], { w: 'this is the options' }, callback);
        });
    });

    describe('update', () => {
        let updateSample: UpdateSample;

        beforeEach(() => {
            updateSample = new UpdateSample();
        });
        
        it('gets the collection from the database', () => {
            updateSample.collection = 'test collection';

            target.update(updateSample, callback);

            expect(db.collection).toHaveBeenCalledWith('test collection');
        });

        it('calls updateOne when query contains one document', () => {
            updateSample.documents = [{ one: 'document' }];
            updateSample.options = { w: 'this is the options' };

            target.insert(updateSample, callback);

            expect(collection.insertOne).toHaveBeenCalledWith({ one: 'document' }, { w: 'this is the options' }, callback);
        });

        it('calls updateMany when query contains multiple documents', () => {
            updateSample.documents = [{ one: 'document' }, { another: 'document' }];
            updateSample.options = { w: 'this is the options' };

            target.insert(updateSample, callback);

            expect(collection.insertMany).toHaveBeenCalledWith([{ one: 'document' }, { another: 'document' }], { w: 'this is the options' }, callback);
        });
    });
});

// NOTE: Do not use these queries as example queries.  They are built to have poor abstraction to support easier
// testing of the DatabaseExecutor class.
interface Sample extends Document {
    thing: number;
}

class DeleteSample implements DbDelete {
    collection: string;
    filter: Object;
    options: CollectionOptions;
}

class InsertSample implements DbInsert {
    collection: string;
	documents: Object[] = [];
	options: CollectionInsertOneOptions;
}

class UpdateSample implements DbUpdate {
    collection: string;
	documents: Object[] = [];
	filter: Object;
	options: CollectionUpdateOptions;

}

class FindSample implements DbFind<Sample> {
    collection: string;
    filter: Object;
    fields: Object;
    paging: Paging;
    mapResults(record: any, callback: NodeCallback<Sample>): void {
        callback(null);
    }
    
}