'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function Session($cookies, AppSettings) {
    this.create = function (accountID, displayName) {
        this.accountID = accountID;
        this.displayName = displayName;
         $cookies.put('ng_session', displayName)
    };
    this.get = function () {
        this.accountID = null;
        this.displayName = null;
        if($cookies.get('ng_session')) {
            this.displayName = $cookies.get('ng_session').replace(/\*20/gi, ' ');
        }
    };
    this.destroy = function () {
        $cookies.remove('ng_session');
        this.accountID = null;
        this.displayName = null;
    };
}


servicesModule.service('Session', Session);