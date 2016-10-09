import { Injector } from 'aramsay-injector';
import { Db } from 'mongodb';

export const mongoDbInjectorToken = 'aramsay-framework:MongoDb';

export interface FrameworkModuleDependencies {
    mongoDb: () => Db;
}

export class FrameworkModule {
    static registerDependencies(dependencies: FrameworkModuleDependencies, injector: Injector) {
        if (!dependencies.mongoDb) {
            throw new Error('You must specify a Db factory to be registered');
        }

        injector.registerFactory(mongoDbInjectorToken, dependencies.mongoDb);
    }
}