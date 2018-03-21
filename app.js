/* SERVER Side - nodejs http server*/
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

console.log('listening at port localhost:' + 80);
app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  	function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
  	
  	});
}

io.on('connection', function (socket) {
  socket.emit('update', {version: 1.0, description: 'feature f one bugfix'});
  socket.on('activate', function (data) {
  	console.log(data);
  });
});