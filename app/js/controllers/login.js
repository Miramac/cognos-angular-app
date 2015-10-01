'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginCtrl($rootScope, $state, AuthService, AuthEvents) {
    // ViewModel
    var vm = this;
    
    vm.title = 'Cognos WebApp Login';
    vm.credentials = {
        username: '',
        password: ''
    };
    
    vm.loginError = false;
    
    vm.login = function() {
        AuthService.login(vm.credentials)
        .then(function () {
            $rootScope.$broadcast(AuthEvents.loginSuccess);    
            vm.loginError = false;       
        }, function (error) {
            $rootScope.$broadcast(AuthEvents.loginFailed);
            vm.loginError = true;
            vm.credentials.password = '';
        });
    };
}

controllersModule.controller('LoginCtrl', LoginCtrl);