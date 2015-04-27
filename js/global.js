var gardenRobin = angular.module('gardenRobin', ['ngRoute','ngAnimate']);


gardenRobin.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/jobs/:month',{
			controller: 'jobsCtrl',
			templateUrl: "/partials/jobs.html"
		});
});

gardenRobin.controller('jobsCtrl', function($scope,$routeParams){
	$scope.templateUrl = '/partials/jobs/' + $routeParams.month + '.html';
});

gardenRobin.directive('svgClick', function($location){
	return {
		link : function($scope, iElement, iAttrs, controller){
			iElement.bind('click', function(){
				$scope.$apply(function() {
					$location.path($(iElement).data('query'));
				});
			});
		}
	};
});

gardenRobin.directive('svgHover', function(){
	return {
		link : function($scope, iElement, iAttrs, controller){
			iElement.bind('mouseenter', function(){
				$('.months a.' + $(iElement).attr('class')).addClass('hovering');
			});
			iElement.bind('mouseout', function(){
				$('.months a.' + $(iElement).attr('class')).removeClass('hovering');
			});
		}
	};
});

gardenRobin.directive('monthHover', function(){
	return {
		link : function($scope, iElement, iAttrs, controller){
			iElement.bind('mouseenter', function(){
				$('.months path.' + $(iElement).attr('class'))[0].classList.add('hovering');
			});
			iElement.bind('mouseout', function(){
				$('.months path.' + $(iElement).attr('class'))[0].classList.remove('hovering');
			});
		}
	};
});

gardenRobin.directive('date', function(){
	return {
		link : function($scope, iElement, iAttrs, controller){
			$scope.month = new Date();
		}
	};
});
