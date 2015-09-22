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

  angular.module('app').constant('AppSettings', require('./constants'));

  angular.module('app').config(require('./config'));

  angular.module('app').run(require('./run'));

  angular.bootstrap(document, ['app']);

});