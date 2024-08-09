import Client from "../src/client";

describe("[client.ts]", () => {
    jest.mock("../src/client");

    const client = new Client(
        { timeout: 10000 },
        {
            method: "get",
            url: "https://www.google.com",
        }
    );

    it("should create new Client", async () => {
        expect(client).toBeInstanceOf(Client);
    });

    it("should return stats", async () => {
        expect(client.getStats()).toBe(client._breaker?.stats);
    });
});
