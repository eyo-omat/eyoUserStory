angular.module('myApp', [
		'mainController', 
		'authService', 
		'appRoutes', 
		'usersController', 
		'usersService',
		'storyController',
		'storyService',
		'reverseDirective'

	])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
});