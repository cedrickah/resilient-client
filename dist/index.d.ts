import { AxiosRequestConfig } from 'axios';
import CircuitBreaker from 'opossum';

declare class Client {
    _cbOptions: CircuitBreaker.Options<unknown[]>;
    _reqOptions: AxiosRequestConfig<any>;
    _breaker: CircuitBreaker | null;
    constructor(cbOptions: CircuitBreaker.Options, reqOptions: AxiosRequestConfig);
    fetch(): Promise<unknown>;
    static isBreakerError(error: unknown): boolean;
    getStats(): CircuitBreaker.Stats | undefined;
}

declare const ResilientClient: typeof Client;
export default ResilientClient;

export { }
