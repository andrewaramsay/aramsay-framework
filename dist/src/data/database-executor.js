"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aramsay_injector_1 = require('aramsay-injector');
var DatabaseExecutor = (function () {
    function DatabaseExecutor() {
    }
    DatabaseExecutor.prototype.deleteRecordById = function (query, callback) {
        var Model = query.model;
        Model.findByIdAndRemove(query.id, query.options, callback);
    };
    DatabaseExecutor.prototype.deleteRecords = function (query, callback) {
        var Model = query.model;
        Model.remove(query.condition, callback);
    };
    DatabaseExecutor.prototype.findById = function (query, callback) {
        var self = this;
        var Model = query.model;
        var mongooseQuery = Model.findById(query.id, query.fields, query.options);
        self.runQuery(query, mongooseQuery, callback);
    };
    DatabaseExecutor.prototype.findMany = function (query, callback) {
        var self = this;
        var Model = query.model;
        var mongooseQuery = Model.find(query.condition, query.fields, query.options);
        self.runQuery(query, mongooseQuery, callback);
    };
    DatabaseExecutor.prototype.findOne = function (query, callback) {
        var self = this;
        var Model = query.model;
        var mongooseQuery = Model.findOne(query.condition, query.fields, query.options);
        self.runQuery(query, mongooseQuery, callback);
    };
    DatabaseExecutor.prototype.saveData = function (write, callback) {
        var Model = write.model;
        var model = new Model(write.data);
        model.save(function (err, rec) { return callback(err, rec && rec.id); });
    };
    DatabaseExecutor.prototype.updateRecordById = function (query, callback) {
        var Model = query.model;
        Model.findByIdAndUpdate(query.id, query.data, query.options, callback);
    };
    DatabaseExecutor.prototype.runQuery = function (query, mongooseQuery, callback) {
        for (var _i = 0, _a = query.populate || []; _i < _a.length; _i++) {
            var property = _a[_i];
            mongooseQuery = mongooseQuery.populate(property);
        }
        mongooseQuery.exec(callback);
    };
    DatabaseExecutor = __decorate([
        aramsay_injector_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DatabaseExecutor);
    return DatabaseExecutor;
}());
exports.DatabaseExecutor = DatabaseExecutor;
//# sourceMappingURL=database-executor.js.map