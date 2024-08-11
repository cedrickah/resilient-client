import CircuitBreaker from "opossum";
import Request from "./request";
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
export default Client;
