'use strict';

/* Services */

(function() {
  var tweetChallengeservices = angular.module('tweetChallenge.services', []);
  
  tweetChallengeservices.factory('socket', function ($rootScope) {

    // Uncomment next line then comment other var socket line for local development.
    var socket = io.connect('http://localhost:5000'); 

    // If intending to use with Heroku substitute your heroku app URL
    // var socket = io.connect('http://salty-shelf-3423.herokuapp.com:80');

    console.dir(socket);
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
              callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
                callback.apply(socket, args);
            }
          });
        })
      }
    };
  });

  return {
    tweetChallengeservices : tweetChallengeservices
  };

})();

