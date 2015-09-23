'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ApplicationCtrl($scope, AuthService) {
   
    $scope.isAuthenticated =  AuthService.isAuthenticated;
    $scope.getDisplayName =  AuthService.getDisplayName;
    $scope.logout = AuthService.logout; 
    
    $scope.getNavbar = function() {
        
    }
}

controllersModule.controller('ApplicationCtrl', ApplicationCtrl);