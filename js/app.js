(function () {
  'use strict';

  angular.module('cognosApp', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/start', {
          controller: 'OverviewCtrl',
          templateUrl: 'views/overview.html'
        })
        .when('/report', {
          controller: 'ReportSegmentCtrl',
          templateUrl: 'views/reportsegment.html'
        })
        .when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }]);
})();