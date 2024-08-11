import { AxiosRequestConfig, AxiosResponse } from "axios";
declare class Request {
    _config: AxiosRequestConfig<any>;
    constructor(requestConfig: AxiosRequestConfig);
    exec: (abortSignal: AbortSignal) => Promise<AxiosResponse>;
}
export default Request;
