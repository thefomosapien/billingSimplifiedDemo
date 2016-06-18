angular.module("app").controller("searchBillCtrl", function($scope, searchBillSvc) {


$scope.getAllBills = function() {
   // console.log("INVOKED ON CTRL!!!!!!!!")
   searchBillSvc.getAllBills().then(function(res) {
      console.log(res);
      $scope.bills = res;
   })
}
$scope.getAllBills();

$scope.selectBill = function(bill){
   $scope.selectedBill = bill;
}

$scope.selectPatient = function(bill){
   $scope.selectedPatient = bill;
}

});
