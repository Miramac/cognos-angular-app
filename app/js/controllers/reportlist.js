'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ReportListCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'Report List';
  vm.number = 1234;

}

controllersModule.controller('ReportListCtrl', ReportListCtrl);