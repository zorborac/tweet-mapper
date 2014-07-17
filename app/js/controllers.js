'use strict';

/* Controllers */

(function() {
	

	//  300 tweets is about all my Mac Air with 4GB ram could handle. Could likely increase a bit on a heftier machine
	var MAX_TWEETS_ARRAY_LENGTH = 300;
	var TWEET_CLIP_PERCENT  = 28;
	var NUM_TWEETS_CLIP = Math.ceil( MAX_TWEETS_ARRAY_LENGTH * (TWEET_CLIP_PERCENT/100) );

	var tweetChallengeControllers = angular.module('tweetChallenge.controllers', []);
	

	tweetChallengeControllers.controller('TweetCtrl', ['$scope','$window','$timeout', 'socket',
		function TweetCtrl ($scope, $window, $timeout, socket) {

			$scope.findingTweets = false;
			$scope.tweets = [];
			$scope.buttonText = "START";

			$scope.findTweets = function() {

				if ( !$scope.findingTweets ) {
					console.log('scope tweets length upon start ' + $scope.tweets.length);

					$scope.findingTweets = true;
					$scope.buttonText = "RESET";
					socket.emit('tweet-io:start', true);


					socket.on('tweet-io:tweets', function (data) {

				     	$scope.tweets = $scope.tweets.concat(data);

					    if ( $scope.tweets.length >= MAX_TWEETS_ARRAY_LENGTH ) {
					    	console.log('max array length!');


					    	$timeout(function() {
					    		$scope.tweets = $scope.tweets.slice(NUM_TWEETS_CLIP);	
					    	});

					    	console.log('tweet array lenth is : ' +$scope.tweets.length);
					    }
					});
				}
				else if ( $scope.findingTweets === true ){

					// Not the most elegant solution but was having problems killing the socket and receiving angular
					// duplicate object errors. Attempted to use track by $index but that ruined the filter. Suffices
					// for the moment. 

					$window.location.reload();
				}
			}
		}
	]);

	return {
		tweetChallengeControllers : tweetChallengeControllers
	}

})();




