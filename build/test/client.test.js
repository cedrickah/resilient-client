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
describe("[client.ts]", () => {
    jest.mock("../src/client");
    const client = new Client({ timeout: 10000 }, {
        method: "get",
        url: "https://www.google.com",
    });
    it("should create new Client", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(client).toBeInstanceOf(Client);
    }));
    it("should return stats", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        expect(client.getStats()).toBe((_a = client._breaker) === null || _a === void 0 ? void 0 : _a.stats);
    }));
});
