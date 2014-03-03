var gardenRobin = angular.module('gardenRobin', ['ngRoute','ngAnimate']);

gardenRobin.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/jobs/:month',{
			templateUrl: 'partials/jobs.html',
			controller: 'jobsCtrl'
		});
});

gardenRobin.factory('Jobs', function($rootScope){
	var Jobs = function Jobs(query){
		this.query = query || {};
		this.jobs = [];
	};

	Jobs.prototype.loadJobs = function(){
		var jobs = this;

		var query = angular.copy(this.query);

		dpd.jobs.get(query, function(result){
			Array.prototype.push.apply(jobs.jobs, result);
			$rootScope.$apply();
		});
	}

	return Jobs;
});

gardenRobin.directive('svgClick', function($location){
	return {
		link : function($scope, iElement, iAttrs, controller){
			iElement.bind('click', function(){
				$scope.$apply(function() {
				  $location.path($(iElement).data('month'));
				});
			});
		}
	}
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
	}
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
	}
});

gardenRobin.directive('date', function(){
	return {
		link : function($scope, iElement, iAttrs, controller){
			$scope.month = new Date();
		}
	}
});

gardenRobin.controller('jobsCtrl', function($scope,$routeParams,Jobs){

	var jobs = new Jobs({month:$routeParams.month});

	jobs.loadJobs();
	$scope.jobs = jobs.jobs;
	$scope.jobs.open = true;
});