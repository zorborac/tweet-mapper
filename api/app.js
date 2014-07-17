var express = require('express');
var app = express();

var port = Number(process.env.PORT || 5000);
var server = app.listen(port);
var io = require('socket.io').listen(server);
exports.io = io;

console.log('node socket.io tweet app started on port ' + server.address().port);

//Configuration
app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger());

app.all('*', function(req, res, next) {
  	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  	if ('OPTIONS' == req.method) return res.send(200);
  	next();
});

var twitter = require('./config/twitter');