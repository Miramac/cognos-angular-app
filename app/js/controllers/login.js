'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginCtrl($scope, $rootScope, $state, AuthService, AuthEvents) {
    // ViewModel
    var vm = this;
    
    vm.title = 'Login!';
    vm.credentials = {
        username: '',
        password: ''
    };
    
    vm.loginError = false;
    
    vm.login = function() {
        AuthService.login(vm.credentials)
        .then(function (data) {
            $rootScope.$broadcast(AuthEvents.loginSuccess);
            $scope.setCurrentUser(data.displayName);
            $state.go('ReportList');
        }, function (error) {
            $rootScope.$broadcast(AuthEvents.loginFailed);
            console.log('error: ' + error);
            
            vm.loginError = true;
            vm.credentials.password = '';
        });
    };
}

controllersModule.controller('LoginCtrl', LoginCtrl);