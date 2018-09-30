const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const redis = require('redis');
const url = 'localhost:6379';

const client1 = redis.createClient();
const client2 = redis.createClient();

const routes = require('./routes');
client1.on('message', (channel, messgae) => {
  client2.hgetall(messgae, (error, response) =>{
    // response.key = messgae;
    console.log('sending out msg', messgae, response, error);
    io.sockets.emit('message', messgae);
  })
});

client1.subscribe('chatMessages');

// CORS setup

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('www'));

app.post('/message', routes.createMessage);


http.listen(8800, () => {
  console.log('Listening on *:8800');
});