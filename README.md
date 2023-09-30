# hazel-proxy

proxy server for hazelcord

## usage

the [hazelcord](https://github.com/retrixe/hazelcord) client works with this proxy

in the future there are plans to add a TypeScript API to complement the HTTP API so hazelcord can self-host this locally on your device

## configuration

```json
{
  "port": 3000, // optional, 3000 is the default
  "token": "Bot token or User token (this violates ToS! but the option is there.)",
  "rootUrl": "root URL where this proxy is hosted, can be empty if not using OAuth",
  "jwtSecret": "a randomly generated secret, around 32 ASCII characters long or 256-bit",
  // if you disable OAuth, then the proxy will require you to input the JWT secret as a password,
  // and if the token is that of a bot, then the bot will send messages directly instead of using
  // webhooks to fake account nicks/pfps (since it cannot identify the user anymore)
  // in user token mode, it is simply used for verifying your identity, it may be more convenient
  // to disable it instead
  "useOAuth": true,
  "clientId": "client ID from a discord application, needed for OAuth",
  "clientSecret": "client secret from a discord application, needed for OAuth"
}
```
