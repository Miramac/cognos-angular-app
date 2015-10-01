'use strict';

/**
 * @ngInject
 */
function Config($stateProvider, $locationProvider, $urlRouterProvider) {

    //$locationProvider.html5Mode(true);
  function authenticate($q, $state, $timeout, AuthService) {
        if (AuthService.isAuthenticated()) {
            // Resolve the promise successfully
            return $q.when();
        } else {
            // The next bit of code is asynchronously tricky.
            $timeout(function () {
                // This code runs after the authentication promise has been rejected.
                // Go to the log-in page
              //  $state.go('Login');
              //new: show login modal
              AuthService.showLogin();
            });

            // Reject the authentication promise to prevent the state from loading
            return $q.reject();
        }
    };
    
    

    
    
    $stateProvider
        .state('Home', {
            url: '/',
            controller: 'HomeCtrl as home',
            templateUrl: 'home.html',
            title: 'Home',
            resolve: { authenticate: authenticate }
        })
        .state('ListTable', {
            url: '/list-table',
            controller: 'ListTableCtrl as table',
            templateUrl: 'listtable.html',
            title: 'ListTable',
            resolve: { authenticate: authenticate }
        })
        .state('CrossTable', {
            url: '/cross-table',
            controller: 'CrossTableCtrl as table',
            templateUrl: 'crosstable.html',
            title: 'CrossTable',
            resolve: { authenticate: authenticate }
        })
     /*   .state('Login', {
                  url: '/login',
            controller: 'LoginCtrl as login',
            templateUrl: 'login.html',
              //    title: 'Login',
                  resolve: { authenticate: notauthenticate }
             })
             */
        .state('Logout', {
            url: '/logout',
            controller: 'LoginCtrl as login',
            templateUrl: 'login.html',
            title: 'Logout',
            resolve: { authenticate: authenticate }
        });

        $urlRouterProvider.otherwise('/');


   
}

module.exports = Config;