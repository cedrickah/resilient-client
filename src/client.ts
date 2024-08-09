import CircuitBreaker from "opossum";
import Request from "./request.ts";
import { AxiosRequestConfig } from "axios";

class Client {
    _cbOptions;
    _reqOptions;
    _breaker: CircuitBreaker | null;

    constructor(
        cbOptions: CircuitBreaker.Options,
        reqOptions: AxiosRequestConfig
    ) {
        this._cbOptions = cbOptions;
        this._reqOptions = reqOptions;
        this._breaker = null;
    }

    fetch() {
        const abortController = new AbortController();
        const circuitBreakerOptions = {
            abortController,
            ...this._cbOptions,
        };

        const request = new Request(this._reqOptions);
        let breaker: CircuitBreaker;
        if (this._breaker) {
            breaker = this._breaker;
        } else {
            breaker = new CircuitBreaker(request.exec, circuitBreakerOptions);
            this._breaker = breaker;
        }

        return breaker.fire(circuitBreakerOptions.abortController.signal);
    }

    static isBreakerError(error: unknown) {
        return CircuitBreaker.isOurError(error);
    }

    getStats() {
        return this._breaker?.stats;
    }
}

export default Client;
