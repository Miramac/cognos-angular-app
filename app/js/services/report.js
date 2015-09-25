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
                if (res.data.filterResultSet && res.data.filterResultSet.filterResult[0] && res.data.filterResultSet.filterResult[0].reportElement[0] && res.data.filterResultSet.filterResult[0].reportElement[0].lst) {
                    deferred.resolve(res.data.filterResultSet.filterResult[0].reportElement[0].lst);
                } else {
                    deferred.reject("MISSING DATA");
                }
            }, function (err, status) {
                deferred.reject(err, status);
            });

        return deferred.promise;
    };

    var getReportItem = function (reportPath, name, parameters) {
        parameters = (parameters) ? parameters : {};
        parameters.frm = (parameters.frm) ? parameters.frm : 'json';
        parameters.selection = name;
        parameters.nocache = new Date().getTime();

        var rdsUrl = AppSettings.cognosCgi + '/rds/reportData/searchPath/' + reportPath;
        /** TESTING */
        rdsUrl = '/cognos/report_table.json';

        return $http.get(rdsUrl, { params: parameters });
    };

    return reportService;

}

servicesModule.factory('ReportService', ReportService);