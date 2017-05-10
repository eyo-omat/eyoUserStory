angular.module('reverseDirective', [])

.filter('sort', function() {

	return function(items){
		return items.slice().reverse();
	}
});
