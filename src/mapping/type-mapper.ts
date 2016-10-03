import { map } from 'async';

import { NodeCallback } from '../common';

export abstract class TypeMapper<TBusiness, TOther> {
    abstract toBusinessModel(source: TOther, callback: NodeCallback<TBusiness>): void;
    
    toBusinessModels(source: TOther[], callback: NodeCallback<TBusiness[]>): void {
        map(source, this.toBusinessModel, callback);
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
}
