import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

/**
 * Wrapper for an Axios client.
 *
 * @private
 * @class Fetcher
 * @param {AxiosRequestConfig} options Axios options for the wrapper {@link Fetcher}
 */
class Fetcher {
    _options;
    _axiosInstance: AxiosInstance | undefined;

    constructor(options: AxiosRequestConfig) {
        this._options = options;
        this._init(options.baseURL);
    }

    /**
     * Init a axios instance.
     *
     * @param {string} apiURL The base URL of the Axios client
     * @returns {void}
     */
    private _init = (apiURL?: string): void => {
        if (apiURL) {
            const client = axios.create({
                baseURL: apiURL,
            });
            this._axiosInstance = client;
        } else {
            throw new Error("BaseURL is required in fetcher config");
        }
    };

    /**
     * Perform a HTTP request.
     *
     * @param {AbortSignal} abortSignal Abort signal to cancel the request
     * @param {AxiosRequestConfig} fetchConfig Options for the Axios request
     * @return {Promise<AxiosResponse>} Promise resolves with the response
     */
    exec = (
        abortSignal: AbortSignal,
        fetchConfig: AxiosRequestConfig
    ): Promise<AxiosResponse> => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            this._axiosInstance
                ?.request({ ...fetchConfig, signal: abortSignal })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };
}

export default Fetcher;
