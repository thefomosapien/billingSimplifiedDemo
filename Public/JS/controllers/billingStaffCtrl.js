angular.module("app")
    .controller('billingStaffCtrl', function($scope, practiceStaffService, billingAdminService) {

    $scope.clinicAdded = true; //this keeps the "create new user for clinic" div hidden until a new clinic is added
    $scope.addNewStaff = true; //
    $scope.showAddNewStaff = function() {
        $scope.addNewStaff = !$scope.addNewStaff;
    }

    var getPractices = function() {
        billingAdminService.getPractices().then(function(response) {
            $scope.practices = response.data;
            console.log(response.data);
            console.log(response);
            console.log(response.data.name);

        })
    }
    getPractices()

    $scope.hidden = true;
    $scope.unhidden = function(practice) {
        $scope.hidden = !$scope.hidden;
        $scope.chosenClinic = practice;
        $scope.praxId = practice._id;
        console.log(practice.patients);
        console.log($scope.chosenClinic.patients);
        console.log($scope.chosenClinic.patients.firstName);
    }

    $scope.hidebills = false;
    $scope.showPatientBills = function(patient){
      $scope.hidebills=!$scope.hidebills;
      $scope.patientBill = patient;
      console.log($scope.patientBill);
    }
    $scope.addPayment = true;
    $scope.showAddPayment = function(id) {
        $scope.addPayment = !$scope.addPayment;
        $scope.billId = id;
    }

    $scope.makePayment = function(paymentInfo, billId) {
        practiceStaffService.makePayment(paymentInfo, billId)
            .then(function(response) {
                console.log(response);
            })
    }
    $scope.submitBill = function(bill, patientId) {
      console.log(bill);
      console.log(patientId);
        practiceStaffService.submitBill(bill, patientId)
            .then(function(response) {
                practiceStaffService.addToBillArray(response)
                // console.log("submit bill response", response);
                    .then(function(response) {

                      return response;
                    })
            })
    }
    $scope.updatePatient = function(updatePat, patientBill){
        console.log("update", updatePat);
        console.log("patient", patientBill);
        practiceStaffService.updatePatient(updatePat, patientBill)
        
            .then(function(response){
                $scope.updatedPatient =  response;
                console.log(response);
                return response;
            })
    }

});
