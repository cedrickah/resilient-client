import axios from "axios";
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
export default Request;
