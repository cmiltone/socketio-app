# socketio-app

## Setup
``` bash
# install dependencies
npm install

# Serve with node.js http server at http://localhost
npm run start

# Serve with express 3/4 at http://localhost
npm run start-express

```

## How it works

- A socket(using socket.io) is set up to enable connection. 

- The server(via the socket) emits (or sends out) notifcations.

- The subscriber(or the client browser) gets the notification when they connect to the socket, the client can also send back data after some logic is done

## Examples

-- See the console for an example update notification as recieved from the server

-- See the command prompt for an example of actvated updates as sent from the client
