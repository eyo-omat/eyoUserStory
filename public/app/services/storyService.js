angular.module('storyService', [])


.factory('Story', function($http){

	var storyfactory = {};

	storyfactory.allStories = function(){
		return $http.get('/api/all_stories');
	}

	storyfactory.createStory = function(storyData){
		return $http.post('/api', storyData);
	}

	storyfactory.getStories = function(){
		return $http.get('/api');
	}

	return storyfactory;
})

.factory('socketio', function($rootScope){

	var socket = io.connect();

	return {
		on: function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(callback){
						console.log(args);
						callback.apply(socket, args);
					} else {
						console.log('appl failed');
					}
				});
			});
		}
	};
})