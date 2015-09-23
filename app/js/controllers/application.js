'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ApplicationCtrl($scope, AuthService) {
    $scope.currentUser = null;
    $scope.isAuthenticated =  AuthService.isAuthenticated; //function() {return false;}//

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

}

controllersModule.controller('ApplicationCtrl', ApplicationCtrl);