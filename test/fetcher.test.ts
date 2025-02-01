import Fetcher from "../src/fetcher";

describe("[fetcher.ts]", () => {
    jest.mock("../src/fetcher");

    it("should create new Fetcher", async () => {
        const fetcher = new Fetcher({
            baseURL: "http://localhost:8000",
        });
        expect(fetcher).toBeInstanceOf(Fetcher);
    });
});
