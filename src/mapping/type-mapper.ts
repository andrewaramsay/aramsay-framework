import { map } from 'async';

import { NodeCallback } from '../common';

export abstract class TypeMapper<TBusiness, TOther> {
    abstract toBusinessModel(source: TOther, callback: NodeCallback<TBusiness>): void;
    abstract fromBusinessModel(source: TBusiness, callback: NodeCallback<TOther>): void;
    
    toBusinessModels(source: TOther[], callback: NodeCallback<TBusiness[]>): void {
        map(source, (source, cb) => this.toBusinessModel(source, cb), callback);
    }

    mapCallback(callback: NodeCallback<TBusiness>): NodeCallback<TOther> {
        return (err: Error, source: TOther) => {
            if (err) { return callback(err); }
            this.toBusinessModel(source, callback);
        };
    }

    mapArrayCallback(callback: NodeCallback<TBusiness[]>): NodeCallback<TOther[]> {
        return (err: Error, sourceArray: TOther[]) => {
            if (err) { return callback(err); }
            this.toBusinessModels(sourceArray, callback);  
        }  
    }

    fromBusinessModels(source: TBusiness[], callback: NodeCallback<TOther[]>): void {
        map(source, (source, cb) => this.fromBusinessModel(source, cb), callback);
    }    

    mapFromCallback(callback: NodeCallback<TOther>): NodeCallback<TBusiness> {
        return (err: Error, source: TBusiness) => {
            if (err) { return callback(err); }
            this.fromBusinessModel(source, callback);
        };
    }

    mapFromArrayCallback(callback: NodeCallback<TOther[]>): NodeCallback<TBusiness[]> {
        return (err: Error, sourceArray: TBusiness[]) => {
            if (err) { return callback(err); }
            this.fromBusinessModels(sourceArray, callback);
        };
    }
}
