"use strict";
function callCallback(callbackPosition) {
    var callbackArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        callbackArgs[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return args[callbackPosition].apply(args, callbackArgs);
    };
}
exports.callCallback = callCallback;
function spy(method) {
    return method;
}
exports.spy = spy;
//# sourceMappingURL=utils.js.map