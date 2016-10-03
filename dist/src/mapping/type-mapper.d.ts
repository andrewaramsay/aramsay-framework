import { NodeCallback } from '../common';
export declare abstract class TypeMapper<TBusiness, TOther> {
    abstract toBusinessModel(source: TOther, callback: NodeCallback<TBusiness>): void;
    toBusinessModels(source: TOther[], callback: NodeCallback<TBusiness[]>): void;
    mapCallback(callback: NodeCallback<TBusiness>): NodeCallback<TOther>;
    mapArrayCallback(callback: NodeCallback<TBusiness[]>): NodeCallback<TOther[]>;
}
