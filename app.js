const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const redis = require('redis');
const url = 'localhost:6379';

// const client1 = redis.createClient();
// const client2 = redis.createClient();

// const routes = require('./routes');
// client1.on('message', (channel, messgae) => {
//   client2.hgetall(messgae, (error, response) =>{
//     // response.key = messgae;
//     console.log('sending out msg', messgae, response, error);
//     io.sockets.emit('message', messgae);
//   })
// });

// client1.subscribe('chatMessages');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('www'));

http.listen(8000, () => {
  console.log('Listening on *:8000');
});