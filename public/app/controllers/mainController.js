angular.module('mainController', [])

.controller('mainController', function($rootScope, $location, Auth) {

    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function() {

        vm.loggedIn = Auth.isLoggedIn();

        Auth.getUser()
            .then(function(response) {
                vm.user = response.data;
            });
    });

    vm.doLogin = function() {

        vm.processing = true;

        vm.error = '';

        Auth.login(vm.loginData.username, vm.loginData.password)
            .then(function(response) {
                vm.processing = false;

                Auth.getUser()
                    .then(function(response) {
                        vm.user = response.data;
                    }, function (error){
				    console.log(error, " can't get data.");
				});

                if (response.success) {
                	$location.path('/');
                } else {
                	vm.error = response.messeage;
                }
            },function (error){
			    console.log(error, " can't get data.");
			});
    }

    vm.doLogout = function(){
    	console.log('loggin out');
    	Auth.logout();
    	$location.path('/logout');
    }
});

