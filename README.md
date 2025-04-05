# resilient-client

A resilience `HTTP` client. Fail and recover fast.
`resilient-client` is a JavaScript `HTTP` client that executes requests
and monitors their execution status. When request start failing, `resilient-client`
plays dead and fails fast. You can provide function to manage failures.
It uses `Opossum`, a `Circuit Breaker` and `Axios` underneath. For more about the `Circuit Breaker` pattern, there are lots of resources
on the web.

## Installing

```
npm i resilient-client
```

## Usage

Let's say you've to call an API endpoint. `HTTP` requests might fail.
All requests from `resilient-client` are perfomed on circuits. `Resilient-client` can throws `HTTP` error or `Circuit Breaker` error. A `Circuit Breaker` error can open the circuit. When the circuit is open subsequent requests are blocked untils the circuit close again.

```javascript
const ResilientClient = require("resilient-client");
// import ResilientClient from "resilient-client"; // For ESM modules

const client = new ResilientClient(
    {
        timeout: 10000, // Set Opossum timeout option. If our request takes longer than 3 seconds, trigger a failure
        errorThresholdPercentage: 50, // Set Opossum errorThresholdPercentage option. If 50% of requests fail, open the circuit.
        resetTimeout: 30000, // Set Opossum resetTimeout option. After 30 seconds, try again.
    },
    {
        baseURL: "http://localhost:8000", // The API URL
    }
);

// Performs a GET request at http://localhost:8000/users
client
    .request({ url: "users", method: "get" })
    .then((result) => console.log(result))
    .catch((error) =>
        ResilientClient.isBreakerError(error)
            ? console.error("Circuit breaker error occured: " + error) // The request takes longer than 30 seconds
            : // or 50% of requests fail
              console.error("Http error occured: " + error)
    );
```

## Examples

See `examples/` folder for more uses cases.

## Documentation

Check out the full documentation [here](https://cedrickah.github.io/resilient-client/).

## Contribution

Contributions are welcome. See `CONTRIBUTING.md`.
