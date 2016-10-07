import { NodeCallback } from '../common';
export declare abstract class TypeMapper<TBusiness, TOther> {
    abstract toBusinessModel(source: TOther, callback: NodeCallback<TBusiness>): void;
    abstract fromBusinessModel(source: TBusiness, callback: NodeCallback<TOther>): void;
    toBusinessModels(source: TOther[], callback: NodeCallback<TBusiness[]>): void;
    mapCallback(callback: NodeCallback<TBusiness>): NodeCallback<TOther>;
    mapArrayCallback(callback: NodeCallback<TBusiness[]>): NodeCallback<TOther[]>;
    fromBusinessModels(source: TBusiness[], callback: NodeCallback<TOther[]>): void;
    mapFromCallback(callback: NodeCallback<TOther>): NodeCallback<TBusiness>;
    mapFromArrayCallback(callback: NodeCallback<TOther[]>): NodeCallback<TBusiness[]>;
}
