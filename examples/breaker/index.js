const ResilientClient = require("../../dist/index.cjs");

const client = new ResilientClient(
    { timeout: 10000, resetTimeout: 3000, errorThresholdPercentage: 50 },
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

const getUsersbreaker = client.getCircuitBreaker({
    requestURL: "users",
    requestMethod: "get",
});

getUsersbreaker.on("halfOpen", () =>
    console.log("Get users circuit half-open, testing service...")
);
console.log(getUsersbreaker.stats);

setTimeout(() => {}, 5000); // Keep the process running for 05 seconds
