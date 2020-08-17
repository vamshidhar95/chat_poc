var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set port
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));
console.log("dirname", __dirname);
app.get('/', function(req, res) {
   res.sendFile('/chat/chatHead.html', { root: '.' });
   
});

http.listen(port, function() {
   console.log('listening on *:3000');
});