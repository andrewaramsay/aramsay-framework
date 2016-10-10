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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var aramsay_injector_1 = require('aramsay-injector');
var mongodb_1 = require('mongodb');
var async_1 = require('async');
var framework_module_1 = require('../dependency-injection/framework-module');
var DatabaseExecutor = (function () {
    function DatabaseExecutor(db) {
        this.db = db;
    }
    DatabaseExecutor.prototype.deleteMany = function (query, callback) {
        var collection = this.db.collection(query.collection);
        collection.deleteMany(query.filter, query.options, callback);
    };
    DatabaseExecutor.prototype.deleteOne = function (query, callback) {
        var collection = this.db.collection(query.collection);
        collection.deleteOne(query.filter, query.options, callback);
    };
    DatabaseExecutor.prototype.findMany = function (query, callback) {
        var collection = this.db.collection(query.collection);
        var cursor = collection.find(query.filter);
        if (query.fields) {
            cursor = cursor.project(query.fields);
        }
        if (query.paging) {
            cursor = cursor.skip(query.paging.offset).limit(query.paging.limit);
        }
        cursor.toArray(function (err, records) {
            if (err) {
                return callback(err);
            }
            async_1.map(records, function (rec, cb) { return query.mapResults(rec, cb); }, callback);
        });
    };
    DatabaseExecutor.prototype.findOne = function (query, callback) {
        var collection = this.db.collection(query.collection);
        var cursor = collection.find(query.filter);
        if (query.fields) {
            cursor = cursor.project(query.fields);
        }
        cursor.limit(1).next(function (err, record) {
            if (err) {
                return callback(err);
            }
            query.mapResults(record, callback);
        });
    };
    DatabaseExecutor.prototype.insert = function (insert, callback) {
        var collection = this.db.collection(insert.collection);
        if (insert.documents.length > 1) {
            collection.insertMany(insert.documents, insert.options, callback);
        }
        else {
            collection.insertOne(insert.documents[0], insert.options, callback);
        }
    };
    DatabaseExecutor.prototype.update = function (update, callback) {
        var collection = this.db.collection(update.collection);
        if (update.documents.length > 1) {
            collection.updateMany(update.filter, update.documents, update.options, callback);
        }
        else {
            collection.updateOne(update.filter, update.documents[0], update.options, callback);
        }
    };
    DatabaseExecutor = __decorate([
        aramsay_injector_1.Injectable({ instanceMode: aramsay_injector_1.InstanceMode.SingleInstance }),
        __param(0, aramsay_injector_1.Inject(framework_module_1.mongoDbInjectorToken)), 
        __metadata('design:paramtypes', [mongodb_1.Db])
    ], DatabaseExecutor);
    return DatabaseExecutor;
}());
exports.DatabaseExecutor = DatabaseExecutor;
//# sourceMappingURL=database-executor.js.map