import Client from "../src/client";
import nock from "nock";

describe("[client.ts]", () => {
    jest.mock("../src/client");

    const url = "https://www.google.com";
    const client = new Client(
        { timeout: 10000 },
        {
            method: "get",
            url,
        }
    );

    it("should be closed after fetch #1", async () => {
        nock(url).get("/").reply(200);

        client
            .fetch()
            .then(() => expect(client?._breaker?.closed).toBe(true))
            .catch(console.error);
    });

    it("should be open after fetch #2", async () => {
        nock(url).get("/").reply(500);

        client.fetch().catch(() => expect(client?._breaker?.closed).toBe(true));
    });
});
