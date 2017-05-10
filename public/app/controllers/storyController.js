angular.module('storyController', ['storyService'])

.controller('storyController', function(Story, socketio){

	var vm = this;

	Story.getStories()
		.then(function(response){
			vm.stories = response.data;
		}, function(error){

		});

	vm.writeStory = function(){

		vm.message = '';

		Story.createStory(vm.storyData)
			.then(function(response){
				//clear the form
				vm.storyData = '';

				vm.message = response.message;

			}, function(error){

			});
	};

	socketio.on('story', function(response){
		vm.stories.push(response);
	});

})

.controller('AllStoriesController', function(stories, socketio){

	var vm = this;

	vm.stories = stories.data;

	socketio.on('story', function(response){
		vm.stories.push(response);
	});
})