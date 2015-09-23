'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-animate');
require('angular-ui-bootstrap');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

var constants = require('./constants')

// create and bootstrap application
angular.element(document).ready(function() {

    var requires = [
        'ngAnimate', 
        'ui.bootstrap',
        'ui.router',
        'templates',
        'app.controllers',
        'app.services',
        'app.directives'
    ];
    
    // mount on window for testing
    window.app = angular.module('app', requires);
    
    //set constants 
    angular.module('app').constant('AppSettings', constants.AppSettings);
    angular.module('app').constant('AuthEvents', constants.AuthEvents);
    
    angular.module('app').config(require('./config'));
    
    angular.module('app').run(require('./run'));
    
    angular.bootstrap(document, ['app']);

});