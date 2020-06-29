# WHICH MUSICIAN DO YOU STAN?

To view this project, clone it to your desktop, open two terminals. You will also need to generate your own API key from Spotify. To do so, head to the Spotify Developers Website and sign up for free. Create a blank app and retrieve the Client ID Key and the Client Secret Key from the app dashboard.

Navigate musician-stans/auth-server-authorization_code/ and open app.js. Copy your Client ID Key and the Client Secret Key into the variables at the top of the file

```
var client_id = ENTER_YOUR_CLIENTID_KEY;
var client_secret = ENTER_YOUR_CLIENT_SECRET_KEY;
```

To start the Node server, change into the auth-server/authorization_code folder: `npm start`

To start the client, change into the root directory: `npm start`

Login with your Spotify credentials to see who you truly stan.
