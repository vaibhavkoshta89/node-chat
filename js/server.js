/**
 * New node file
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(1337, "localhost");
var io = require('socket.io')(server);

io.on('connection', function(client) {
	client.on('join', function(data) {
		client.nickname = data;
		io.emit('message', client.nickname + ' Connected..');
	});

	client.on('sendMessage', function(data) {
		console.log(data);
		var nickname = client.nickname;
		client.broadcast.emit('message', nickname + ": " + data);
		client.emit('message', nickname + ": " + data);

	});
	client.on('disconnected', function(data) {
		var nickname = client.nickname;
		client.emit('message', nickname + " Disconnected");

	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});