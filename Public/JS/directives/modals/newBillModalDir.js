angular.module('app').directive('newBillModalDir', function () {
  return {
    restrict: 'E',
    templateUrl: 'JS/directives/modals/newBillModal.html',
    controller: 'newBillModalCtrl'
  };

});