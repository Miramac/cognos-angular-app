'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HomeCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'Home!';
  vm.number = 1234;

}

controllersModule.controller('HomeCtrl', HomeCtrl);