"use strict";
var async_1 = require('async');
var TypeMapper = (function () {
    function TypeMapper() {
    }
    TypeMapper.prototype.toBusinessModels = function (source, callback) {
        async_1.map(source, this.toBusinessModel.bind(this), callback);
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
    TypeMapper.prototype.fromBusinessModels = function (source, callback) {
        async_1.map(source, this.fromBusinessModel.bind(this), callback);
    };
    TypeMapper.prototype.mapFromCallback = function (callback) {
        var _this = this;
        return function (err, source) {
            if (err) {
                return callback(err);
            }
            _this.fromBusinessModel(source, callback);
        };
    };
    TypeMapper.prototype.mapFromArrayCallback = function (callback) {
        var _this = this;
        return function (err, sourceArray) {
            if (err) {
                return callback(err);
            }
            _this.fromBusinessModels(sourceArray, callback);
        };
    };
    return TypeMapper;
}());
exports.TypeMapper = TypeMapper;
//# sourceMappingURL=type-mapper.js.map