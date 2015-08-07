var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var path = require('path');

var app = express();
var server = http.Server(app);
var io = socketio(server);

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', function(socket) {
    socket.on('code', function(code) {
        socket.broadcast.emit('run', code);
    });
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log('listening on :', port);
});
