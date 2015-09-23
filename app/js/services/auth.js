'use strict';

var servicesModule = require('./_index.js');

/**
 * @ -ngInject
 */
function AuthService($q, $http, AppSettings, Session) {
var authService = {};
 
  authService.login = function (credentials) {
    var loginUrl = AppSettings.cognosCgi + '/rds/auth/logon';
    return $http
      .post(loginUrl, credentials)
      .then(function (res) {
        Session.create(res.data);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
};

servicesModule.factory('AuthService', AuthService);

