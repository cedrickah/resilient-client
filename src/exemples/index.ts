import ResilientClient from "../index";

const client = new ResilientClient(
    { timeout: 10000 },
    {
        method: "get",
        url: "https://www.google.com",
    }
);

client.fetch();
