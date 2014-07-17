var Twit = require('twit');
var io = require('../app').io;

var TWEETS_BUFFER_SIZE = 20;
var SOCKETIO_TWEETS_EVENT = 'tweet-io:tweets';
var SOCKETIO_START_EVENT = 'tweet-io:start';
var SOCKETIO_STOP_EVENT = 'tweet-io:stop';
var nbOpenSockets = 0;
var isFirstConnectionToTwitter = true;

var TWEET_SEND_INTERVAL = 666;
var hasBroadcastBegun = false;


// NOTE: would never leave these sitting around in production app

var T = new Twit({
    consumer_key:         'API key',
    consumer_secret:      'API secret',
    access_token:         'Access token',
    access_token_secret:  'Access token secret'
});

console.log("Listening for tweets from The Whole World");

var stream = T.stream('statuses/filter', { locations: [-180,-90,180,90] });

var tweetsBuffer = [];

//Handle Socket.IO events
var discardClient = function() {
	console.log('Client disconnected !');
	nbOpenSockets--;

	if (nbOpenSockets <= 0) {
		nbOpenSockets = 0;
		console.log("No active client. Stop streaming from Twitter");
		stream.stop();
	}
};

var handleClient = function(data, socket) {
	if (data == true) {
		console.log('Client connected !');
		
		if (nbOpenSockets <= 0) {
			nbOpenSockets = 0;
			console.log('First active client. Start streaming from Twitter');
			stream.start();
		}

		nbOpenSockets++;
	}
};

io.sockets.on('connection', function(socket) {

	socket.on(SOCKETIO_START_EVENT, function(data) {
		handleClient(data, socket);
	});

	socket.on(SOCKETIO_STOP_EVENT, discardClient);

	socket.on('disconnect', discardClient);
});


//Handle Twitter events
stream.on('connect', function(request) {
	console.log('Connected to Twitter API');

	if (isFirstConnectionToTwitter) {
		isFirstConnectionToTwitter = false;
		stream.stop();
	}
});

stream.on('disconnect', function(message) {
	console.log('Disconnected from Twitter API. Message: ' + message);
});

stream.on('reconnect', function (request, response, connectInterval) {
  	console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
});

stream.on('tweet', function(tweet) {

		var msg = {};

		msg.geo = tweet.coordinates;
		msg.text = tweet.text;

		msg.user = {
			screen_name: tweet.user.screen_name,
			name: tweet.user.name 
		};

		tweetsBuffer.push(msg);
		broadcastTweets();
});

var broadcastTweets = function() {

	if (!hasBroadcastBegun) {
		hasBroadcastBegun = true;

		setInterval(function() {

			if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {

				var randomNumToPush = Math.floor( (Math.random() * 10) + 1 );
				console.log('number of tweets pushed ' + randomNumToPush);

				tweetsBuffer = tweetsBuffer.slice(-randomNumToPush);

				io.sockets.emit(SOCKETIO_TWEETS_EVENT, tweetsBuffer);
				
				tweetsBuffer = [];
			}
		}, TWEET_SEND_INTERVAL);
	}
}