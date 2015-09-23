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

        /** TESTING **/
        if(credentials.username == 'roloff')
            loginUrl = '/cognos/login_ok.xml';
        else 
            loginUrl = '/cognos/login_fail.xml';

        var xmlCredentials = AppSettings.xmlCredentialTpl.replace('{{username}}', credentials.username).replace('{{password}}', credentials.password);
        $http
            .get(loginUrl, { xmlData: xmlCredentials })
            .then(function (res) {
                //parse xml respons from cognos logon
                var data = xmlToJSON.parseString(res.data)
                var user = {};
                //test user + password  ok
                if(data && data.accountInfo) {
                    user.accountID = data.accountInfo[0].accountID[0]._text;
                    user.displayName = data.accountInfo[0].displayName[0]._text;
                    Session.create(user.accountID, user.displayName);
                    $cookies.put(AppSettings.cognosSessionCookieName, user.displayName);
                    deferred.resolve(user);
                } else {
                     deferred.reject(new Error("Wrong passwort or username"))
                }
            }, function (err, status) {
                deferred.reject(err, status);
            });
           return deferred.promise;
    };

    authService.isAuthenticated = function () {
        var isAuthenticated = !!Session.displayName;
        if(!isAuthenticated){
            var cognosSessionCookie =  $cookies.get(AppSettings.cognosSessionCookieName);
            if(cognosSessionCookie) {
                isAuthenticated = true;
                Session.create("user.accountID", "user.displayName");
            }
        }
        return isAuthenticated;
    };
    
    authService.getDisplayName = function() {
        return Session.displayName;
    }
    
    authService.logout = function() {
        Session.destroy();
         $cookies.remove(AppSettings.cognosSessionCookieName);
        $state.go('Login');
    }
    
    return authService;
};

servicesModule.factory('AuthService', AuthService);

