'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginCtrl($http, Session, AppSettings) {
    // ViewModel
    var vm = this;
    
    vm.title = 'Login!';
    
    var loginUrl = AppSettings.cognosCgi + '/rds/auth/logon';
    
    vm.doLogin = function() {
        console.log('Log in: ', AppSettings.cognosCgi, vm.username, vm.password);
        var xmlCredentials = AppSettings.xmlCredentialTpl.replace('{{username}}', vm.username).replace('{{password}}', vm.password);
        return Session.create("a", "b", "c");
  
      //  return AuthService.login(xmlCredentials);
/*
        $http.post(loginUrl, { xmlData: xmlCredentials }).
            then(function (response) {
                console.log('succses: ', response.data);
            }, function (response) {
                console.log('error: ', response.data);
            });
    
        return false;
        */
    };
}

controllersModule.controller('LoginCtrl', LoginCtrl);