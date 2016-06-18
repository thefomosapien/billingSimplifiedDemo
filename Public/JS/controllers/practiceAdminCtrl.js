angular.module("app")
    .controller('practiceAdminCtrl', function($scope, practiceStaffAndClinic, practiceStaffService, chartService) {

		$scope.getDailyChartData = function(practiceId) {
			chartService.getDailyChartData(practiceId)
				.then(function(response) {
					console.log(response);
					return response;
				});
		};

		$scope.getWeeklyChartData = function(practiceId) {
			chartService.getWeeklyChartData(practiceId)
				.then(function(response) {
					console.log(response);
					return response;
				});
		};

		$scope.getMonthlyChartData = function(practiceId) {
			chartService.getMonthlyChartData(practiceId)
				.then(function(response) {
					console.log(response);
					return response;
				});
		};

        console.log(practiceStaffAndClinic);

        $scope.staffMember = practiceStaffAndClinic.currentUser;
        $scope.currentPractice = practiceStaffAndClinic.practice

        $scope.currentPracticeId = practiceStaffAndClinic.practice._id;

        $scope.addBill = true;

        $scope.showAddBill = function(id) {
            $scope.addBill = !$scope.addBill
            practiceStaffAndClinic.practice.patients.forEach(function(i) {
                if (i._id === id) {
                    $scope.patientInfo = i;
                }
            })
            // $scope.patientInfo = {
            //     patientName: fName + " " + lName,
            //     id: id
            // };
        }

        $scope.submitBill = function(bill, patientId) {
            practiceStaffService.submitBill(bill, patientId)
                .then(function(response) {
                    practiceStaffService.addToBillArray(response)
                    // console.log("submit bill response", response);
                        .then(function(response) {
                            $scope.bill = "";
                        })
                })
        }

        $scope.addPatient = function(patient, practiceId) {
            practiceStaffService.addPatient(patient, practiceId)
                .then(function(response) {
                    $scope.newAddPatient = response.data;
                    practiceStaffService.addToPatientArray(response.data)
                        .then (function(response){
                            console.log(response);
                            $scope.newPatient = "";
                        })
                })
        };

        $scope.addPayment = true;
        $scope.showAddPayment = function(id) {
            $scope.addPayment = !$scope.addPayment;
            $scope.billId = id;
        }

        $scope.makePayment = function(paymentInfo, billId) {
            practiceStaffService.makePayment(paymentInfo, billId)
                .then(function(response) {
                    console.log(response);
                    $scope.payment = "";
                })
        }

});
