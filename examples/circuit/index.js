const ResilientClient = require("../../dist/index.cjs.js");

const client = new ResilientClient(
    { timeout: 10000 },
    {
        baseURL: "http://localhost:8000",
    }
);

// First request attempt. The request fails due to a http error. The circuit open.
client
    .request({ url: "/not-found", method: "get" })
    .then((result) => console.log(result))
    .catch((error) =>
        ResilientClient.isBreakerError(error)
            ? console.error(
                  "Circuit breaker error occured at first attempt\n\t" + error
              )
            : console.error("Http error occured at first attempt\n\t" + error)
    );

// Second request attempt. The request will fails.
setTimeout(function () {
    client
        .request({ url: "/not-found", method: "get" })
        .then((result) => console.log(result))
        .catch((error) =>
            ResilientClient.isBreakerError(error)
                ? console.error(
                      "Circuit breaker error occured at second attempt\n\t" +
                          error
                  )
                : console.error(
                      "Http error occured at second attempt\n\t" + error
                  )
        );
}, 5000);
