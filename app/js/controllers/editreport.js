'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function EditReportCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'Edit Report';

}

controllersModule.controller('EditReportCtrl', EditReportCtrl);