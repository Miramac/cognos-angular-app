'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginCtrl($http, AppSettings) {

  // ViewModel
  var vm = this;

  vm.title = 'Login!';
  
  var loginUrl = AppSettings.cognosCgi + '/rds/auth/logon';
  
  vm.doLogin = function() {
    console.log('Log in: ', vm.username, vm.password);
    var xmlCredentials = AppSettings.xmlCredentialTpl.replace('{{username}}', vm.userName).replace('{{password}}', vm.password);
    
    $http.post(loginUrl, {xmlData:xmlCredentials}).
    then(function(response) {
        console.log('succses: ', response.data);
    }, function(response) {
        console.log('error: ',  response.data);
    });
    
    return false;
  };
}

controllersModule.controller('LoginCtrl',['$http', 'AppSettings', LoginCtrl]);