'use strict';

/**
 * @ngInject
 */
function Config($stateProvider, $locationProvider, $urlRouterProvider) {

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
    controller: 'ReportListCtrl as reportList',
    templateUrl: 'reportlist.html',
    title: 'Report List'
  })
  .state('EditReport', {
    url: '/edit',
    controller: 'EditReportCtrl as editReport',
    templateUrl: 'editreport.html',
    title: 'Edit Report'
  })
  .state('Login', {
    url: '/login',
    controller: 'LoginCtrl as login',
    templateUrl: 'login.html',
    title: 'Login'
  });

  $urlRouterProvider.otherwise('/login');

}

module.exports = Config;