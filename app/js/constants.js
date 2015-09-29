'use strict';

//App globals
var AppSettings = {
    appTitle: 'Cognos WebApp',
    cognosSessionCookieName: 'cam_passport',
    cognosCgi: '/cognos/cgi-bin/cognos.cgi',
    xmlCredentialTpl: '<credentials><credentialElements><name>CAMNamespace</name><label>AD</label><value><actualValue>AD</actualValue></value></credentialElements><credentialElements><name>CAMUsername</name><label>User ID:</label><value><actualValue>{{username}}</actualValue></value></credentialElements><credentialElements><name>CAMPassword</name><label>Password:</label><value><actualValue>{{password}}</actualValue></value></credentialElements></credentials>',
};

//Login Events
var AuthEvents =  {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
};


module.exports = {
    AppSettings: AppSettings,
    AuthEvents: AuthEvents
} ;