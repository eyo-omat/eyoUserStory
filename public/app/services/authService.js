angular.module('authService', [])


.factory('Auth', function($http, $q, AuthToken) {

    var authFactory = {};

    authFactory.login = function(username, password) {

        return $http.post('/api/login', {
                username: username,
                password: password
            })
            .then(function(response) {
                console.log('about to setToken::');
                console.log(response.data.token);
                AuthToken.setToken(response.data.token);
                return response.data;
            }, function (error){
                console.log(error, " can't get data.");
            });
    }

    authFactory.logout = function() {
        console.log('clearing token');
        AuthToken.setToken();
    }

    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    authFactory.getUser = function() {

        if (AuthToken.getToken()) {
            return $http.get('/api/me');
        } else {
           return $q.reject({ message: 'User has no token'});
        }
    }

    return authFactory;
})

.factory('AuthToken', function($window) {

    var authTokenFactory = {};

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    }

    authTokenFactory.setToken = function(token) {
        if (token) {
            console.log('saving token....');
            console.log(token);
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    }

    return authTokenFactory;
})


.factory('AuthInterceptor', function($q, $location, AuthToken) {

    var interceptorFactory = {};

    interceptorFactory.request = function(config) {
        var token = AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }

        return config;
    }

    interceptorFactory.responseError = function(res){
    	if (res.status == 403) {
    		$location.path('/login');
    		return $q.reject(res);
    	}
    }

    return interceptorFactory;
});
