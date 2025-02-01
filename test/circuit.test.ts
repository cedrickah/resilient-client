import Client from "../src/client";
import nock from "nock";

describe("[circuit.ts]", () => {
    jest.mock("../src/client");

    const url = "http://localhost:8000";
    const client = new Client(
        { timeout: 10000, errorThresholdPercentage: 50 },
        {
            baseURL: url,
        }
    );

    it("should be closed after request #1", async () => {
        nock(url).get("/users").reply(200);

        client
            .request({ url: "users", method: "get" })
            .then(() => {
                const breaker = client.getCircuitBreaker({
                    requestURL: "users",
                    requestMethod: "get",
                });
                expect(breaker.closed).toBe(true);
            })
            .catch(console.error);
    });

    it("should be open after request #2", async () => {
        nock(url).get("/not-found").reply(500);

        client
            .request({ url: "not-found", method: "get" })
            .then(() => {
                const breaker = client.getCircuitBreaker({
                    requestURL: "not-found",
                    requestMethod: "get",
                });
                expect(breaker.closed).toBe(true);
            })
            .catch(console.error);
    });
});
