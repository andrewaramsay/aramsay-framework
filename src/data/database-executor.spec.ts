/// <reference path="../../typings/index.d.ts" />
import { Document, Model } from 'mongoose';

import { DatabaseExecutor } from './database-executor';
import { QueryById } from './types';

describe('DatabaseExecutor', () => {
    let target: DatabaseExecutor;

    beforeEach(() => {
        target = new DatabaseExecutor();
        target.updateRecordById
    });

    describe('deleteRecordById', () => {

    });
    
    describe('deleteRecords', () => {

    });
    
    describe('findById', () => {

    });
    
    describe('findMany', () => {

    });
    
    describe('findOne', () => {

    });
    
    describe('saveData', () => {

    });

    describe('updateRecordById', () => {

    });
});

interface Sample extends Document {
    thing: number;
}

class SampleModel implements Model<Sample> {

}

class FindSampleById implements QueryById<Sample> {
    constructor(private _id: string) {
    }
    
    get model() {
        return {};
    }
    
    get id() {
        return this._id;
    }
}
