(function () {
  'use strict';

  angular.module('cognosApp')
    .controller('OverviewCtrl', ['$scope', function ($scope) {
        angular.element($('#top-navbar')).scope().setActive('start');
    }]);
})();