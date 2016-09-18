/**
 * Angular indexController:
 * --
 * @category Controllers
 * @package app/components/index
 * @author Gary Constable <garyconstable80@gmail.com>
 * @copyright (c) 2016, Gary Constable
 * @version 0.1
 */
var indexController = function($scope, $http)
{
	$scope.tweets = [];
	$scope.username = '';
	$scope.instructions = 'To begin, enter a name into the search box.'
	$scope.notFound = 'Oops, please try another user.'
	/**
	 * Constructor
	 * --
	 * @return {[type]} [description]
	 */
	this.construct = function(){};
	/**
	 * Submit the @username
	 * --
	 * @return Void
	 */
	$scope.submit = function(){
		$scope.getTimeline();
	}
	/**
	 * Submit the @username
	 * --
	 * @return Void
	 */
	$scope.clear = function(){
		$scope.tweets = [];
		$scope.username = "";
		$('.supertux-container p').text($scope.instructions);
		$('.supertux-container').show();
	}
	/**
	 * Send request to twitter timeline
	 * --
	 * @return {[type]} [description]
	 */
	$scope.getTimeline = function()
	{
		$('.spinner').css({display: 'inline'});
    $http({
      method: 'GET',
      url: '/twitter/timeline',
			params:  params = {
				username: $scope.username
			}
    }).then(function successCallback(response) {
			$('.spinner').css({display: 'none'});
      console.log(response);
			if(typeof response.data !== "undefined"){
				if(Array.isArray(response.data) && response.data.length >= 1){
					$('.supertux-container').hide();
					$scope.tweets = response.data;
				}else{
					$('.supertux-container p').text($scope.notFound);
				}
			}
		});
	}
	this.construct.apply(this, arguments);
}
angular.module('webApp').controller('indexController', indexController);
