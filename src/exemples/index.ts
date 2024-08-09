import ResilientClient from "../index.ts";

const client = new ResilientClient(
    { timeout: 10000 },
    {
        method: "get",
        url: "https://www.google.com",
    }
);

client.fetch().then(console.log).catch(console.error);
