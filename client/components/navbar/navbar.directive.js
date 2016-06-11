'use strict';

angular.module('thisvsthatApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'mainCtrl',
    controllerAs: 'nav'
  }));
