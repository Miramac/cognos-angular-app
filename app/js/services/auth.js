/* global angular */
'use strict';

var servicesModule = require('./_index');
var xmlToJSON = require('../vendor/xml2json');

/**
 * @ -ngInject
 */
function AuthService($q, $http, $cookies, $state, AppSettings, Session) {
    var authService = {};

    authService.login = function (credentials) {

        var deferred = $q.defer();
        var loginUrl = AppSettings.cognosCgi + '/rds/auth/logon';

        var xmlCredentials = AppSettings.xmlCredentialTpl.replace('{{username}}', credentials.username).replace('{{password}}', credentials.password);
        $http({method: 'GET', //must be POST on server! /** TESTING **/
                url:loginUrl, 
                data:  'xmlData='+xmlCredentials ,
                headers: { "Content-Type": 'application/x-www-form-urlencoded' }})
            .then(function (res) {
                //parse xml respons from cognos logon
                var data = xmlToJSON.parseString(res.data);
                var user = {};
                //test user + password  ok
                if (data && data.accountInfo) {
                    user.accountID = data.accountInfo[0].accountID[0]._text;
                    user.displayName = data.accountInfo[0].displayName[0]._text;
                    Session.create(user.accountID, user.displayName);
                   
                    deferred.resolve(user);
                } else {
                    deferred.reject(new Error("Wrong passwort or username"));
                }
            }, function (err, status) {
                deferred.reject(err, status);
            });
        return deferred.promise;
    };

    authService.isAuthenticated = function () {
        var isAuthenticated = !!Session.displayName;
        if (!isAuthenticated) {
            Session.get();
            isAuthenticated = !!Session.displayName
        }
        return isAuthenticated;
    };

    authService.getDisplayName = function () {
        return Session.displayName;
    };

    authService.logout = function () {
        
        
        $http.get(AppSettings.cognosCgi + '/rds/auth/logoff').then(function(){
            var cookies = [ //Cognos coogies
                'CRN',
                'cam_passport',
                'cea-ssa',
                'userCapabilities',
                'usersessionid',
                'cc_session'],
            i;
            for(i=0; i<cookies.length; i++) {
                $cookies.remove(cookies[i], {path: '/cognos'});
            }
            
            Session.destroy();
            $state.go('Login');
        })
    };
    
    return authService;
}

servicesModule.factory('AuthService', AuthService);

