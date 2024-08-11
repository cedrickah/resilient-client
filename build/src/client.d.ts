import CircuitBreaker from "opossum";
import { AxiosRequestConfig } from "axios";
declare class Client {
    _cbOptions: CircuitBreaker.Options<unknown[]>;
    _reqOptions: AxiosRequestConfig<any>;
    _breaker: CircuitBreaker | null;
    constructor(cbOptions: CircuitBreaker.Options, reqOptions: AxiosRequestConfig);
    fetch(): Promise<unknown>;
    static isBreakerError(error: unknown): boolean;
    getStats(): CircuitBreaker.Stats | undefined;
}
export default Client;
