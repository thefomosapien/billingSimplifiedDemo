angular.module("app")
    .controller('practiceStaffCtrl', function($scope, practiceStaffService, practiceStaffAndClinic, toaster, $state) {

        console.log(practiceStaffAndClinic);

        // Modal show and hide
        $scope.modalShown = false;
        $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
        };


        $scope.staffMember = practiceStaffAndClinic.currentUser;
        $scope.currentPractice = practiceStaffAndClinic.practice

        $scope.currentPracticeId = practiceStaffAndClinic.practice._id;

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
                        .then(function(response) {
                            $scope.recentBill = response;
                            $scope.bill = "";
                        })
                })
        }

        $scope.addPatient = function (patient, practiceId) {
            console.log(patient, practiceId)
            practiceStaffService.addPatient(patient, practiceId)
                .then(function (response) {
                    $scope.newAddPatient = response.data;
                    practiceStaffService.addToPatientArray(response.data)

                        .then (function(response){
                            $scope.newPatient = "";
                            // $scope.currentPractice = response.data;
                            console.log(response);
                            $state.reload();
                        })
                })
        };

        $scope.deletePatient = function(id) {
            if (confirm("Are you sure you want to delete this patient?")) {
                practiceStaffService.deletePatient(id)
                    .then(function(response) {
                        $state.reload();
                    })
            }
        }

        $scope.addPayment = true;
        $scope.showAddPayment = function (id) {
            $scope.addPayment = !$scope.addPayment;
            $scope.billId = id;
        }

        $scope.makePayment = function (paymentInfo, billId) {
            console.log("hitting here")
            practiceStaffService.makePayment(paymentInfo, billId)
                .then(function (response) {
                    console.log(response);
                    $scope.payment = "";
                    $state.reload();
                })
        }

        var getClinicInfo = function(id) {
            practiceStaffService.getUsersPractice(id)
                .then(function(response) {
                    console.log("get clinic info", response);
                    return response.data;
                })
        }



    });
