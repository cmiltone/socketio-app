/*SERVER Side - express 3/4 server*/
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
console.log('listening at port localhost:' + 80);

server.listen(80);

app.get('/', function (req, res) {
  console.log('got');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
  	console.log(data);
  });
});