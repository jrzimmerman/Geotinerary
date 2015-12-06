(function() {
  'use strict';

  var app = angular.module('app', ['ui.router', 'firebase']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // main <- starting state
      .state('main', {
      url: '/',
      templateUrl: 'app/map/map.html',
      controller: 'main as vm'
    });

  });
})();
