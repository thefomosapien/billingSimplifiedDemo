angular.module("app").controller("searchPatientCtrl", function($scope, searchPatientSvc) {


$scope.getAllPatients = function() {
   // console.log("INVOKED ON CTRL!!!!!!!!")
   searchPatientSvc.getAllPatients().then(function(res) {
      console.log(res);
      $scope.Patients = res;
   })
}
$scope.getAllPatients();

$scope.selectPatient = function(patient){
   $scope.selectedPatient = patient;
}

$scope.selectPatient = function(patient){
   $scope.selectedPatient = patient;
}

});
