'use strict';

(function(){

angular.module('thisvsthatApp', [
  'thisvsthatApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngAnimate',
  'ngMaterial',
  'chart.js'

  ])
  .config(function($urlRouterProvider, $locationProvider, $mdIconProvider) {


    $mdIconProvider
      .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);


    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });

}());
