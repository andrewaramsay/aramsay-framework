"use strict";
var async_1 = require('async');
var TypeMapper = (function () {
    function TypeMapper() {
    }
    TypeMapper.prototype.toBusinessModels = function (source, callback) {
        async_1.map(source, this.toBusinessModel, callback);
    };
    TypeMapper.prototype.mapCallback = function (callback) {
        var _this = this;
        return function (err, source) {
            if (err) {
                return callback(err);
            }
            _this.toBusinessModel(source, callback);
        };
    };
    TypeMapper.prototype.mapArrayCallback = function (callback) {
        var _this = this;
        return function (err, sourceArray) {
            if (err) {
                return callback(err);
            }
            _this.toBusinessModels(sourceArray, callback);
        };
    };
    return TypeMapper;
}());
exports.TypeMapper = TypeMapper;
//# sourceMappingURL=type-mapper.js.map