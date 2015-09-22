(function () {
  'use strict';

  angular.module('cognosApp')
    .controller('NavbarCtrl', ['$scope', '$http',function ($scope, $http) {
        $scope.start = "";
        $scope.report = "";
    
         $scope.setActive = function(name) {
            $scope.start = "";
            $scope.report = "";
            $scope[name] = 'active';
         }
    }]);
})();