'use strict';

var CircuitBreaker = require('opossum');
var axios = require('axios');

class Request {
    constructor(requestConfig) {
        this.exec = (abortSignal) => {
            return new Promise((resolve, reject) => {
                axios(Object.assign(Object.assign({}, this._config), { signal: abortSignal }))
                    .then(function (response) {
                    resolve(response);
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        };
        this._config = requestConfig;
    }
}

class Client {
    constructor(cbOptions, reqOptions) {
        this._cbOptions = cbOptions;
        this._reqOptions = reqOptions;
        this._breaker = null;
    }
    fetch() {
        const abortController = new AbortController();
        const circuitBreakerOptions = Object.assign({ abortController }, this._cbOptions);
        const request = new Request(this._reqOptions);
        let breaker;
        if (this._breaker) {
            breaker = this._breaker;
        }
        else {
            breaker = new CircuitBreaker(request.exec, circuitBreakerOptions);
            this._breaker = breaker;
        }
        return breaker.fire(circuitBreakerOptions.abortController.signal);
    }
    static isBreakerError(error) {
        return CircuitBreaker.isOurError(error);
    }
    getStats() {
        var _a;
        return (_a = this._breaker) === null || _a === void 0 ? void 0 : _a.stats;
    }
}

// Module dependencies.
const ResilientClient = Client;

module.exports = ResilientClient;
