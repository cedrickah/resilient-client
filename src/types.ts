import { Method } from "axios";

export type BreakerIndexObject = {
    requestMethod: Method;
    requestURL: string;
};
