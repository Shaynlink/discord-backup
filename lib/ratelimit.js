"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitManager = void 0;
var events_1 = require("events");
/**
 * Manage ratelimit
 */
var RateLimitManager = /** @class */ (function (_super) {
    __extends(RateLimitManager, _super);
    /**
     * @param chunk - Max request before make pause
     * @param timeWait  - Pause time
     * @param timePerRequest - Time per request
     */
    function RateLimitManager(chunk, timeWait, timePerRequest) {
        if (chunk === void 0) { chunk = 50; }
        if (timeWait === void 0) { timeWait = 10000; }
        if (timePerRequest === void 0) { timePerRequest = 750; }
        var _this_1 = _super.call(this) || this;
        // Counter between chunk
        _this_1.counter = 0;
        // Counter total
        _this_1.totalCount = 0;
        _this_1.chunk = chunk;
        _this_1.timeWait = timeWait;
        _this_1.timePerRequest = timePerRequest;
        // Request queue
        _this_1.queue = [];
        // If ratelimit is processing
        _this_1.process = false;
        return _this_1;
    }
    /**
     * @param {Object|Function|any[][]} dataPromised
     * @param {?string} func
     * @param {?any[]} args
     * @return {Promise<any>}
     *
     * @example
     * await resolver([
     *  [
     *      { lowerCase: (str) => str.toLowerCase() },
     *      'lowerCase',
     *      'FoO bAr',
     *  ],
     *  [
     *      (str) => str.ToUpperCase(),
     *      null,
     *      'FoO bAr',
     *  ]
     * ])
     *
     * await resolver(
     *  { lowerCase: (str) => str.toLowerCase() },
     *  'lowerCase',
     *  'FoO bAr',
     * )
     *
     * await resolver(
     *  (str) => str.ToUpperCase(),
     *  null,
     *  'FoO bAr',
     * )
     */
    RateLimitManager.prototype.resolver = function (dataPromised, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this_1, void 0, void 0, function () {
                        var callback, _i, dataPromised_1, _a, _this, _func, _args;
                        var _this_1 = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    // Return invalid data
                                    if (!dataPromised && !func)
                                        return [2 /*return*/, resolve(null)];
                                    callback = function (result) {
                                        if (result == 'xDFhjdgsdg') {
                                            _this_1.emit('debuf', 'Rate Limit executor timeout');
                                        }
                                        ;
                                        resolve(result);
                                    };
                                    // Parse / structure data
                                    if (Array.isArray(dataPromised)) {
                                        for (_i = 0, dataPromised_1 = dataPromised; _i < dataPromised_1.length; _i++) {
                                            _a = dataPromised_1[_i], _this = _a[0], _func = _a[1], _args = _a.slice(2);
                                            this.queue.push(__spreadArrays([_this, _func, callback], _args));
                                        }
                                        ;
                                    }
                                    else {
                                        this.queue.push(__spreadArrays([dataPromised, func, callback], args));
                                    }
                                    ;
                                    if (!!this.process) return [3 /*break*/, 5];
                                    this.process = true;
                                    _b.label = 1;
                                case 1: 
                                //@ts-ignore
                                return [4 /*yield*/, this._process.apply(this, this.queue.shift())];
                                case 2:
                                    //@ts-ignore
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    if (this.queue.length > 0) return [3 /*break*/, 1];
                                    _b.label = 4;
                                case 4:
                                    this.process = false;
                                    this.emit('debug', 'finish');
                                    _b.label = 5;
                                case 5:
                                    ;
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     *
     * @param {Object | Function} dataPromised
     * @param {?string} func
     * @param {Function} next - callback
     * @param {?any[]} args
     * @returns
     */
    RateLimitManager.prototype._process = function (dataPromised, func, next) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this_1, void 0, void 0, function () {
                        var timeout, resultResolved, err_1;
                        var _a;
                        var _this_1 = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    // Return invalid data
                                    if (!dataPromised)
                                        return [2 /*return*/, resolve(null)];
                                    // wait time per request
                                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, _this_1.timePerRequest); })];
                                case 1:
                                    // wait time per request
                                    _b.sent();
                                    // inc glogal count
                                    this.totalCount++;
                                    this.emit('debug', 'request %s', this.totalCount);
                                    if (!(this.counter >= this.chunk)) return [3 /*break*/, 3];
                                    // Wait per chunk
                                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, _this_1.timeWait); })];
                                case 2:
                                    // Wait per chunk
                                    _b.sent();
                                    this.counter = 0;
                                    _b.label = 3;
                                case 3:
                                    ;
                                    // inc global count
                                    this.counter++;
                                    timeout = setTimeout(function () { return resolve('xDFhjdgsdg'); }, 15000);
                                    _b.label = 4;
                                case 4:
                                    _b.trys.push([4, 10, , 11]);
                                    if (!(!func && typeof dataPromised === 'function')) return [3 /*break*/, 6];
                                    return [4 /*yield*/, dataPromised.call.apply(dataPromised, __spreadArrays([dataPromised], args))];
                                case 5:
                                    resultResolved = _b.sent();
                                    return [3 /*break*/, 9];
                                case 6:
                                    if (!(typeof dataPromised[func] === 'function')) return [3 /*break*/, 8];
                                    return [4 /*yield*/, (_a = dataPromised[func]).call.apply(_a, __spreadArrays([dataPromised], args))];
                                case 7:
                                    resultResolved = _b.sent();
                                    return [3 /*break*/, 9];
                                case 8: return [2 /*return*/, resolve(null)];
                                case 9: return [3 /*break*/, 11];
                                case 10:
                                    err_1 = _b.sent();
                                    this.emit('error', err_1);
                                    return [3 /*break*/, 11];
                                case 11:
                                    // Clear timeout
                                    clearTimeout(timeout);
                                    // Resolve data
                                    return [2 /*return*/, resolve(resultResolved)];
                            }
                        });
                    }); }).then(next)];
            });
        });
    };
    ;
    return RateLimitManager;
}(events_1.EventEmitter));
exports.RateLimitManager = RateLimitManager;
