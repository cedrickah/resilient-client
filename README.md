# resilient-client

A resilience http client, fail and recover fast. This package is in beta. Contributions are welcome.

## Usage

Pass circuit breaker(Opossum) options and http agent(Axios) to ResilientClient during instantiation.
Support both CommonJS and ESM modules.

```
import ResilientClient from "../index";

const client = new ResilientClient(
    { timeout: 10000 },
    {
        method: "get",
        url: "https://www.google.com",
    }
);

client
    .fetch()
    .then((result) => console.log(result))
    .catch((error) =>
        ResilientClient.isBreakerError(error)
            ? console.error("Circuit breaker error occured")
            : console.error("Http error occured")
    );

console.log(client.getStats());
/*{
    failures: 0,
    fallbacks: 0,
    successes: 0,
    rejects: 0,
    fires: 1,
    timeouts: 0,
    cacheHits: 0,
    cacheMisses: 0,
    semaphoreRejections: 0,
    percentiles: {
      '0': 0,
      '1': 0,
      '0.25': 0,
      '0.5': 0,
      '0.75': 0,
      '0.9': 0,
      '0.95': 0,
      '0.99': 0,
      '0.995': 0
    },
    latencyTimes: [],
    latencyMean: 0
}*/
```

## Examples

See examples folder for more.

## Documentation

Coming soon.
