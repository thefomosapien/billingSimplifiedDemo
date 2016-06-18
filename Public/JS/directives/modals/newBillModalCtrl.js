angular.module("app")
    .controller('newBillModalCtrl', function ($scope, patientProfileSvc, $stateParams, practiceStaffService) {

        // Modal show and hide
        $scope.modalShown = false;
        $scope.toggleModal = function (id) {
            console.log("hit modal");
            $scope.modalShown = !$scope.modalShown;
        };

        var patientId = $stateParams.id

        $scope.getPatientInfo = function () {
            patientProfileSvc.getPatient(patientId).then(function (response) {
                console.log(response);
                $scope.patientInfo = response;
            })
        }

        $scope.getPatientInfo();

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
                    console.log(response);
                    $scope.billId = response.data._id;
                    console.log($scope.billId);
                    practiceStaffService.addToBillArray(response)

                        // console.log("submit bill response", response);
                        .then(function (response) {
                            console.log(response)
                            $scope.addPayment = false;
                            $scope.hideSubmitBill = true;
                            $scope.bill = "";
                        })
                })
        }

        $scope.hideSubmitBill = false;
        $scope.addPayment = true;
        $scope.showAddPayment = function (id) {
            $scope.addPayment = !$scope.addPayment;
            // $scope.billId = id;
        }

        $scope.hideQuickPayment = true;



    });