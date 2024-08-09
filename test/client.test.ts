import Client from "../src/client";

describe("[client.ts]", () => {
    jest.mock("../src/client");

    it("should create new Client", async () => {
        const client = new Client(
            { timeout: 10000 },
            {
                method: "get",
                url: "https://www.google.com",
            }
        );
        expect(client).toBeInstanceOf(Client);
    });
});
