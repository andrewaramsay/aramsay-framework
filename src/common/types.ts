
export interface NodeCallback<T> {
    (err: Error, result?: T): void;
}

export interface VoidNodeCallback {
    (err?: Error): void;
}

export interface Paging {
    limit: number;
    offset: number;
}