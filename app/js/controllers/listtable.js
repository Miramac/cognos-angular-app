'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ListTableCtrl(ReportService, TransformService) {

    // ViewModel
    var vm = this;

    vm.title = 'ListTable';

    ReportService.getListTable('report/i9A274F2F3DDA4C0D87A0E1B3C108918E', 'List1', { p_Report_ID: 1001 })
        .then(function (data) {
            vm.data = TransformService.report(data);
        }, function (error) {
            console.log("error: " + error);
        });
}

controllersModule.controller('ListTableCtrl', ListTableCtrl);