/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * Manage ratelimit
 */
export declare class RateLimitManager extends EventEmitter {
    counter: number;
    totalCount: number;
    chunk: number;
    timeWait: number;
    timePerRequest: number;
    queue: any[];
    process: boolean;
    /**
     * @param chunk - Max request before make pause
     * @param timeWait  - Pause time
     * @param timePerRequest - Time per request
     */
    constructor(chunk?: number, timeWait?: number, timePerRequest?: number);
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
    resolver(dataPromised: any[][] | any, func?: string, ...args: any[]): Promise<any[] | any>;
    /**
     *
     * @param {Object | Function} dataPromised
     * @param {?string} func
     * @param {Function} next - callback
     * @param {?any[]} args
     * @returns
     */
    _process(dataPromised: Object | Function | any, func?: string, next?: any, ...args: any[]): Promise<any[] | any>;
}
