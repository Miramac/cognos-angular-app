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
                if (res.data) {
                    deferred.resolve(res.data);
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
        parameters.fmt = (parameters.fmt) ? parameters.fmt : 'json';
        parameters.selection = name;
        parameters.nocache = new Date().getTime();
        
        var rdsUrl = AppSettings.cognosCgi + '/rds/reportData/searchPath' + reportPath;

        return $http.get(rdsUrl, { params: parameters });
    };

    return reportService;

}

servicesModule.factory('ReportService', ReportService);