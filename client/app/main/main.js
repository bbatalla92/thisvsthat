'use strict';

(function(){
angular.module('thisvsthatApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    });
  });

}());
