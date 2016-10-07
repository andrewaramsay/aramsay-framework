/// <reference path="../../typings/index.d.ts" />
import { TypeMapper } from './type-mapper';

import { NodeCallback } from '../common';

describe('TypeMapper', () => {
    let target: SampleMapper;

    beforeEach(() => {
        target = new SampleMapper();
    });

    describe('toBusinessModel', () => {
        let dataModel: DataModel;

        beforeEach(() => {
            dataModel = { someValue: 'thing' };
        });

        it('maps a single DataModel to BusinessModel', done => {
            target.toBusinessModel(dataModel, (err: Error, businessModel: BusinessModel) => {
                expect(businessModel.value).toBe('thing');
                done();
            });
        });
    });

    describe('toBusinessModels', () => {
        let dataModels: DataModel[];

        beforeEach(() => {
            dataModels  = [
                { someValue: 'item 1' },
                { someValue: 'item 2' },
                { someValue: 'item 3' },
            ];
        });
        
        it('maps an array of DataModel to an array of BusinessModel', done => {
            target.toBusinessModels(dataModels, (err: Error, businessModels: BusinessModel[]) => {
                expect(businessModels.length).toBe(3);
                expect(businessModels[0].value).toBe('item 1');
                expect(businessModels[1].value).toBe('item 2');
                expect(businessModels[2].value).toBe('item 3');
                done();
            });
        });
    });

    describe('mapCallback', () => {
        let dataModel: DataModel;
        let spy: jasmine.Spy;

        beforeEach(() => {
            dataModel = { someValue: 'thing' };
            spy = jasmine.createSpy('callback', (err: Error, businessModel: BusinessModel) => {});
        });
        
        it('should create a callback that maps a single item', () => {
            target.mapCallback(spy)(null, dataModel);
            expect(spy).toHaveBeenCalledWith(null, { value: 'thing' });
        });

        it('should call callback with only error if an error is thrown', () => {
            let err = new Error('something broke');

            target.mapCallback(spy)(err);
            
            expect(spy).toHaveBeenCalledWith(err);
        });

        it('should not map objects if an error is returned', () => {
            spyOn(target, 'toBusinessModel');

            target.mapCallback(spy)(new Error('something broke'));

            expect(target.toBusinessModel).not.toHaveBeenCalled();
        });
    });

    describe('mapArrayCallback', () => {
        let dataModels: DataModel[];
        let callback: jasmine.Spy;

        beforeEach(() => {
            dataModels  = [
                { someValue: 'item 1' },
                { someValue: 'item 2' },
                { someValue: 'item 3' },
            ];
            callback = jasmine.createSpy('callback', (err: Error, businessModels: BusinessModel[]) => {});
        });
        
        it('should create a callback that maps an array of items', () => {
            target.mapArrayCallback(callback)(null, dataModels);
            expect(callback).toHaveBeenCalledWith(null, [{ value: 'item 1' }, { value: 'item 2' }, { value: 'item 3' }]);
        });

        it('should call callback with only error if an error is thrown', () => {
            let err = new Error('something broke');

            target.mapArrayCallback(callback)(err);

            expect(callback).toHaveBeenCalledWith(err);
        });

        it('should not map objects if an error is returned', () => {
            spyOn(target, 'toBusinessModel');

            target.mapArrayCallback(callback)(new Error('something broke'));
            
            expect(target.toBusinessModel).not.toHaveBeenCalled();
        });
    });
    
    describe('fromBusinessModel', () => {
        let businessModel: BusinessModel;

        beforeEach(() => {
            businessModel = { value: 'thing' };
        });

        it('maps a single BusinessModel to DataModel', done => {
            target.fromBusinessModel(businessModel, (err: Error, dataModel: DataModel) => {
                expect(dataModel.someValue).toBe('thing');
                done();
            });
        });
    });

    describe('fromBusinessModels', () => {
        let businessModels: BusinessModel[];

        beforeEach(() => {
            businessModels  = [
                { value: 'item 1' },
                { value: 'item 2' },
                { value: 'item 3' },
            ];
        });
        
        it('maps an array of DataModel to an array of BusinessModel', done => {
            target.fromBusinessModels(businessModels, (err: Error, dataModels: DataModel[]) => {
                expect(dataModels.length).toBe(3);
                expect(dataModels[0].someValue).toBe('item 1');
                expect(dataModels[1].someValue).toBe('item 2');
                expect(dataModels[2].someValue).toBe('item 3');
                done();
            });
        });
    });

    describe('mapFromCallback', () => {
        let businessModel___: BusinessModel;
        let spy: jasmine.Spy;

        beforeEach(() => {
            businessModel___ = { value: 'thing' };
            spy = jasmine.createSpy('callback');
        });
        
        it('should create a callback that maps a single item', () => {
            target.mapFromCallback(spy)(null, businessModel___);
            expect(spy).toHaveBeenCalledWith(null, { someValue: 'thing' });
        });

        it('should call callback with only error if an error is thrown', () => {
            let err = new Error('something broke');

            target.mapFromCallback(spy)(err);
            
            expect(spy).toHaveBeenCalledWith(err);
        });

        it('should not map objects if an error is returned', () => {
            spyOn(target, 'fromBusinessModel');

            target.mapFromCallback(spy)(new Error('something broke'));

            expect(target.fromBusinessModel).not.toHaveBeenCalled();
        });
    });

    describe('mapFromArrayCallback', () => {
        let businessModel: BusinessModel[];
        let callback: jasmine.Spy;

        beforeEach(() => {
            businessModel  = [
                { value: 'item 1' },
                { value: 'item 2' },
                { value: 'item 3' },
            ];
            callback = jasmine.createSpy('callback');
        });
        
        it('should create a callback that maps an array of items', () => {
            target.mapFromArrayCallback(callback)(null, businessModel);
            expect(callback).toHaveBeenCalledWith(null, [{ someValue: 'item 1' }, { someValue: 'item 2' }, { someValue: 'item 3' }]);
        });

        it('should call callback with only error if an error is thrown', () => {
            let err = new Error('something broke');

            target.mapFromArrayCallback(callback)(err);

            expect(callback).toHaveBeenCalledWith(err);
        });

        it('should not map objects if an error is returned', () => {
            spyOn(target, 'fromBusinessModel');

            target.mapFromArrayCallback(callback)(new Error('something broke'));
            
            expect(target.fromBusinessModel).not.toHaveBeenCalled();
        });
    });
});

interface BusinessModel {
    value: string;
}

interface DataModel {
    someValue: string;
}

class SampleMapper extends TypeMapper<BusinessModel, DataModel> {
    toBusinessModel(dataModel: DataModel, callback: NodeCallback<BusinessModel>): void {
        callback(null, { value: dataModel.someValue });
    }

    fromBusinessModel(businessModel: BusinessModel, callback: NodeCallback<DataModel>): void {
        callback(null, { someValue: businessModel.value });
    }
}
