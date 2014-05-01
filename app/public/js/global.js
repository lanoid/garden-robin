var gardenRobin = angular.module('gardenRobin', ['ngRoute','ngAnimate']);

gardenRobin.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/jobs/:month',{
			templateUrl: 'partials/jobs.html',
			controller: 'jobsCtrl'
		})
		.when('/photos/:season',{
			templateUrl: 'partials/photos.html',
			controller: 'photosCtrl'
		});
});

gardenRobin.factory('Jobs', function($rootScope){
	var Jobs = function Jobs(query){
		this.query = query || {};
		this.jobs = [];
	};

	Jobs.prototype.loadJobs = function(){
		var jobs = this,
			query = angular.copy(this.query);

		dpd.jobs.get(query, function(result){
			Array.prototype.push.apply(jobs.jobs, result);
			$rootScope.$apply();
		});
	}

	return Jobs;
});

gardenRobin.factory('Photos', function($rootScope){
	var Photos = function Photos(query){
		this.query = query || {};
		this.photos = [];
	};

	Photos.prototype.loadPhotos = function(){
		var photos = this,
			query = angular.copy(this.query);

		dpd.photos.get(query, function(result){
			Array.prototype.push.apply(photos.photos, result);
			$rootScope.$apply();
		});
	}

	return Photos;
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

gardenRobin.controller('photosCtrl', function($scope,$routeParams,Photos){
	var photos = new Photos({season:$routeParams.season});

	photos.loadPhotos();
	$scope.photos = photos.photos;
	$scope.photos.open = true;
});