var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Client from "../src/client";
import nock from "nock";
describe("[client.ts]", () => {
    jest.mock("../src/client");
    const url = "https://www.google.com";
    const client = new Client({ timeout: 10000 }, {
        method: "get",
        url,
    });
    it("should be closed after fetch #1", () => __awaiter(void 0, void 0, void 0, function* () {
        nock(url).get("/").reply(200);
        client
            .fetch()
            .then(() => { var _a; return expect((_a = client === null || client === void 0 ? void 0 : client._breaker) === null || _a === void 0 ? void 0 : _a.closed).toBe(true); })
            .catch(console.error);
    }));
    it("should be open after fetch #2", () => __awaiter(void 0, void 0, void 0, function* () {
        nock(url).get("/").reply(500);
        client.fetch().catch(() => { var _a; return expect((_a = client === null || client === void 0 ? void 0 : client._breaker) === null || _a === void 0 ? void 0 : _a.closed).toBe(true); });
    }));
});
