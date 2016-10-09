"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('core-js');
if (!Reflect.defineMetadata) {
    require('reflect-metadata');
}
require('aramsay-injector');
__export(require('./src/common'));
__export(require('./src/data'));
__export(require('./src/mapping'));
__export(require('./src/testing'));
var framework_module_1 = require('./src/dependency-injection/framework-module');
exports.FrameworkModule = framework_module_1.FrameworkModule;
//# sourceMappingURL=index.js.map