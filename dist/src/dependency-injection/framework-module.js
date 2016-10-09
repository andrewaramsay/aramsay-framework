"use strict";
exports.mongoDbInjectorToken = 'aramsay-framework:MongoDb';
var FrameworkModule = (function () {
    function FrameworkModule() {
    }
    FrameworkModule.registerDependencies = function (dependencies, injector) {
        if (!dependencies.mongoDb) {
            throw new Error('You must specify a Db factory to be registered');
        }
        injector.registerFactory(exports.mongoDbInjectorToken, dependencies.mongoDb);
    };
    return FrameworkModule;
}());
exports.FrameworkModule = FrameworkModule;
//# sourceMappingURL=framework-module.js.map