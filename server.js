var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.sockets.on('connection', function(socket) {
	var userId;

	socket.on('join', function(channel) {
		socket.join(channel, function() {
			console.log('Joined');
		})
	})

	socket.on('coordinates', function(coordinates, pageId, clientSideCallback) {
		console.log('Coordinates: ', coordinates);
		userId = coordinates.id;
		io.to(pageId).emit('coordinates', coordinates);
	});

	// NOT DOING ANYTHING
	// socket.on('remove-marker', function(id) {
	// 	console.log(id);
	// 	//io.emit('remove-marker', id);
	// });

	socket.on('disconnect', function() {
		console.log('user disconnected');
		console.log('USER ID: ', userId);
		io.emit('remove-marker', userId);
	});
});

app.use(express.static('assets'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/2', function(req, res) {
	res.sendFile(__dirname + '/index2.html');
});

http.listen(3000);

// app.listen(3000, function() {
// 	console.log('Listening on port 3000');
// });