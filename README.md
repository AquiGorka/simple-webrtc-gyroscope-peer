# Simple webrtc gyroscope peer

Use this app to:

- Connect to another webrtc peer
- Wait for a connection from another webrtc peer

and send the connected peer gyroscope data (alpha, beta & gamma angles).

To toogle between the options (connect to or await connections) use a query
param s=1

Use a query param pid to set the app namespace (checkout PeerJS)

## Dev

```sh
npm i
npm start
```

## Build

```sh
npm run build
```

### Notes

Sign up for a PeerJS api key and update the file config.js accordingly.
