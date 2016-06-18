angular.module('app').directive('billModalDir', function () {
  return {
    restrict: 'E',
    templateUrl: 'JS/directives/modals/billModal.html',
    controller: 'billModalCtrl'
  };

});