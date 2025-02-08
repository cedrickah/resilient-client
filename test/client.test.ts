import Client from "../src/client";

describe("[client.ts]", () => {
    jest.mock("../src/client");

    const client = new Client(
        { timeout: 10000, errorThresholdPercentage: 50 },
        {
            baseURL: "http://localhost:8000",
        }
    );

    it("should create new Client", async () => {
        expect(client).toBeInstanceOf(Client);
    });
});
