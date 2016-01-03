'use strict';

angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'templatesCtrl'
  })
  .when('/templates/:templateId', {
    templateUrl: 'templates/template-details.html',
    controller: 'templateDetailCtrl'
  });
}])

.controller('templatesCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('json/templates.json').success(function(result){
			//console.log(result);
			$scope.templates = result;
		}).error(function(data){
			console.log(data);
		});
}])

.controller('templateDetailCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	var templateId = $routeParams.templateId;
	$http.get('json/templates.json').success(function(result){
			$scope.template = $filter('filter')(result, function(data){
				return data.id == templateId;
			})[0];
			$scope.mainImage = $scope.template.images[templateId-1].name;
		});

	$scope.setImage = function(image){
		$scope.mainImage = image.name;
	}
}]);