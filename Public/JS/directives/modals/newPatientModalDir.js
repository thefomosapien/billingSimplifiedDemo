angular.module('app').directive('newPatientModalDir', function () {
  return {
    restrict: 'E',
    templateUrl: 'JS/directives/modals/newPatientModal.html',
    controller: 'newPatientModalCtrl'
  };

});