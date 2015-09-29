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

        /** TESTING *
        if (credentials.username === 'roloff') {
            loginUrl = '/cognos/login_ok.xml';
        } else {
            loginUrl = '/cognos/login_fail.xml';
        }*/

        var xmlCredentials = AppSettings.xmlCredentialTpl.replace('{{username}}', credentials.username).replace('{{password}}', credentials.password);
        $http({method: 'get',
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
                      $cookies.put('session',user.displayName)
                  //  $cookies.put(AppSettings.cognosSessionCookieName, 's_cc:|s_conf:na|s_sch:td|s_hd:sa|s_serv:na|s_disp:na|s_set:|s_dep:na|s_dir:na|s_sms:dd|s_ct:sa|s_cs:sa|s_so:sa|e_hp:CAMID(*22AD*3au*3a119ca724653e2d438a94db8ed6e0a2cf*22)|e_proot:*c3*96ffentliche*20Ordner|prootid:iFC6C3BC7C3C647B692508F62A355225D|e_mroot:Eigene*20Ordner|mrootid:iEEE137A5E4F846E4A58BFC5FDE59BCFF|e_mrootpath:CAMID(*22AD*3au*3a119ca724653e2d438a94db8ed6e0a2cf*22)*2ffolder*5b*40name*3d*27Eigene*20Ordner*27*5d|e_user:test*20Roloff*20Fabian|cl:de-de|dcid:iFC6C3BC7C3C647B692508F62A355225D|show_logon:false|uig:|ui:|rsuiprofile:pro|lch:f|lca:f|write:true|eom:0|pp:3383203043|cachestamp:2015-09-24T02:59:48');
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
        var isAuthenticated = false;
        if (!isAuthenticated) {
            var cognosSessionCookie = $cookies.get('session');//$cookies.get(AppSettings.cognosSessionCookieName);
            if (cognosSessionCookie) {
                isAuthenticated = true;
                if($cookies.get('session')) {
                    Session.create(cognosSessionCookie, $cookies.get('session').replace(/\*20/gi, ' '));
                }
            }
        }
        return isAuthenticated;
    };

    authService.getDisplayName = function () {
        return Session.displayName;
    };

    authService.logout = function () {
        
        
        $http.get('/cognos/cgi-bin/cognos.cgi/rds/auth/logoff').then(function(){
            var cookies = ['CRN','cam_passport','cea-ssa','userCapabilities','usersessionid','cc_session'],
            i;
            for(i=0; i<cookies.length; i++) {
                $cookies.remove(cookies[i], {path: '/cognos'});
            }
            $cookies.remove('session')
            Session.destroy();
            $state.go('Login');
        })
    };
    
    return authService;
}

servicesModule.factory('AuthService', AuthService);

