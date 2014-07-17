'use strict';

// Declare app level module which depends on filters, and services

(function() {
	var app = angular.module('tweetChallenge', [
		// directives for now live in mapbox directives
		'tweetChallenge.angularMapbox',
		'tweetChallenge.services',
		'tweetChallenge.controllers'
		]);	

	return {
		app: app
	};

})();
