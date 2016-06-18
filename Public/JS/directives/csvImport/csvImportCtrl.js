angular.module("app").controller("csvImportCtrl", function($scope, patientProfileSvc) {

$scope.csvupload = function(csv) {
   var newPatient={};
   if(csv) {
      console.log(csv.result[0])
      var pData = csv.result[0];
      newPatient.firstName=pData[0];
      newPatient.lastName=pData[1];
      newPatient.insurance=pData[2];
      newPatient.email=pData[3];
      newPatient.dob=pData[4];
      
      patientProfileSvc.addPatient(newPatient);

      alert("upload successful")
      console.log(newPatient + "BSDLKJG:LKSDJ:LK")
   } //end if statement
   else {
      alert("please select a file")
   }
   $scope.csv = undefined;
}


});//end controller
