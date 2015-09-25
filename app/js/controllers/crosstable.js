'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function CrossTableCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'Cross Table';

}

controllersModule.controller('CrossTableCtrl', CrossTableCtrl);