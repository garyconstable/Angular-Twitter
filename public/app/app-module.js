
"use strict";
/**
 * Name App and load dependancies
 * --
 */
var appName = 'webApp';
var dependancies = ['ngRoute', 'masonry'];
angular.module(appName, dependancies)
/**
 * App config and routing
 * --
 */
.config(function($interpolateProvider, $httpProvider, $locationProvider, $routeProvider)
{
  $routeProvider.
  when('/', {
    templateUrl: 'app/components/index/indexView.html',
    controller: 'indexController'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
});
/**
 * Jquery ready
 * --
 */
$(function(){
  /**
   * Debounce function
   * https://davidwalsh.name/javascript-debounce-function
   * --
   */
  window.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
  };

  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  // bootstrap the app to the HTML element.
  angular.bootstrap( document.getElementsByTagName("html")[0], [ appName ]);
})
