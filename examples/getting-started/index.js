const ResilientClient = require("../../dist/index.cjs");

const client = new ResilientClient(
    { timeout: 20000, resetTimeout: 3000, errorThresholdPercentage: 50 },
    {
        baseURL: "http://localhost:8000",
    }
);

client
    .request({ url: "users", method: "get" })
    .then((result) => console.log(result))
    .catch((error) =>
        ResilientClient.isBreakerError(error)
            ? console.error("Circuit breaker error occured: " + error)
            : console.error("Http error occured: " + error)
    );
