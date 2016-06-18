angular.module("app")
    .controller('patientProfileCtrl', function ($scope, patientProfileSvc, practiceStaffService, $state, getPatient, billService) {

        // Modal show and hide
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.showPatientModal = function (patient) {
            alert(patient.firstName);
        }

        $scope.patientInfo = getPatient;

        $scope.patientBills = $scope.patientInfo.bills;

        console.log($scope.patientBills)

        $scope.addBill = true;

        $scope.showAddBill = function (id) {
            $scope.addBill = !$scope.addBill
            practiceStaffAndClinic.practice.patients.forEach(function (i) {
                if (i._id === id) {
                    $scope.patientInfo = i;
                }
            })
        }

        $scope.submitBill = function (bill, patientId) {
            practiceStaffService.submitBill(bill, patientId)
                .then(function (response) {
                    practiceStaffService.addToBillArray(response)

                        // console.log("submit bill response", response);
                        .then(function (response) {
                            $scope.bill = "";
                        })
                })
        }

        $scope.addPayment = true;
        $scope.showAddPayment = function (id) {
            $scope.addPayment = !$scope.addPayment;
            $scope.billId = id;
        }

        $scope.makePayment = function (paymentInfo, billId) {
            practiceStaffService.makePayment(paymentInfo, billId)
                .then(function (response) {
                    console.log(response);
                    $scope.payment = "";
                    $state.reload();
                })
        }
        $scope.iamgone= true;
        $scope.unhide = function(iamgone){
          $scope.iamgone = !$scope.iamgone;
        }

        $scope.updatePatient = function (updated, id){
          practiceStaffService.updatePatient(updated, id).then(function(response){
            $scope.updatedPatient = response;
          })
        }

    });
