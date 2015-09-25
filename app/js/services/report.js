'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function ReportService($q, $http, AppSettings) {

    var reportService = {};

    reportService.getListTable = function (reportPath, name, parameters) {
        parameters = (parameters) ? parameters : {};

        var deferred = $q.defer();

        getReportItem(reportPath, name, parameters)
            .then(function (res) {
                var list =  res.data; //res.data.document.pages[0].page.body.item[0].lst;
                deferred.resolve(list);
            }, function (err, status) {
                deferred.reject(err, status);
            });

        return deferred.promise;
    };

    var getReportItem = function (reportPath, name, parameters) {
        parameters = (parameters) ? parameters : {};
        parameters.frm = 'json';
        parameters.selection = name;

        var rdsUrl = AppSettings.cognosCgi + '/rds/reportData/' + reportPath;
        /** TESTING */
        rdsUrl = '/cognos/report_table.json';

        return $http.get(rdsUrl, parameters);
    };

    return reportService;

}

servicesModule.factory('ReportService', ReportService);