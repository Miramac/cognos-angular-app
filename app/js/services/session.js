'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function Session() {
    this.create = function (accountID, displayName) {
        this.accountID = accountID;
        this.displayName = displayName;
    };
    this.destroy = function () {
        this.accountID = null;
        this.displayName = null;
    };
}


servicesModule.service('Session', Session);