(function () {
  'use strict';

  angular.module('cognosApp')
    .controller('ReportSegmentCtrl', ['$scope', function ($scope) {
         angular.element($('#top-navbar')).scope().setActive('report');
    }]);
})();