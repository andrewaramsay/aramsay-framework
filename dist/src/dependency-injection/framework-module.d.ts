import { Injector } from 'aramsay-injector';
import { Db } from 'mongodb';
export declare const mongoDbInjectorToken: string;
export interface FrameworkModuleDependencies {
    mongoDb: () => Db;
}
export declare class FrameworkModule {
    static registerDependencies(dependencies: FrameworkModuleDependencies, injector: Injector): void;
}
