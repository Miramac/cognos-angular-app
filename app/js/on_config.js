'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  })
  .state('ReportList', {
    url: '/reports',
    controller: 'HomeCtrl as home',
    templateUrl: 'reportlist.html',
    title: 'Report List'
  });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;