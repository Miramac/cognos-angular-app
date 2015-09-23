'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginCtrl($rootScope, $state, AuthService, AuthEvents) {
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
            $state.go('Home');
        }, function (error) {
            $rootScope.$broadcast(AuthEvents.loginFailed);
            console.log('error: ' + error);
            
            vm.loginError = true;
            vm.credentials.password = '';
        });
    };
}

controllersModule.controller('LoginCtrl', LoginCtrl);