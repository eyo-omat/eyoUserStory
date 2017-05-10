angular.module('usersController', ['usersService'])

.controller('UserController', function(User){

	var vm = this;

	vm.processing = true;

	User.all()
		.then(function(response){
			vm.users = response;
		}, function(error){
			console.log(error, " could not retrieve users");
		});
})

.controller('UserCreateController', function(User, $window, $location){

	var vm = this;

	vm.signupUser = function(){
		vm.message = '';

		User.create(vm.userData)
			.then(function(response){
				vm.userData = {};
				vm.message = response.data.message;

				$window.localStorage.setItem('token', response.data.token);
				$location.path('/');

			}, function(error){
				console.log(error, " failed to sign up user");
			});
	}
});
