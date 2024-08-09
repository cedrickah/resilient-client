# resilient-client

A resilience http client, fail and recover fast. This package is in beta. Contributions are welcome.

## Installation

```
npm i resilient-client
```

## Usage

Pass circuit breaker(Opossum) options and http agent(Axios) to ResilientClient during instantiation.
Support both CommonJS and ESM modules.

```
import ResilientClient from "../index";

const client = new ResilientClient(
    { timeout: 10000 },
    {
        method: "get",
        url: "https://www.google.com"
    }
);

client.fetch();
```

## Documentation

Coming soon.
