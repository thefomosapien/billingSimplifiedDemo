angular.module("app")
    .controller('billModalCtrl', function ($scope, practiceStaffService, billService, $stateParams, $state) {

        // Modal show and hide
        $scope.billModalShown = false;
        $scope.toggleBillModal = function (billId) {
            if ($scope.billModalShown === false) {
                billService.getBill(billId).then(function (response) {
                    console.log(response);

                    $scope.billInfo = response.data;

                    $scope.total = response.data.billAmount;

                    console.log($scope.total, "TOTAL THIS")

                    $scope.billInfo.dateDue = response.data.dateDue;

                    console.log($scope.billInfo);

                    var paymentsFor = $scope.billInfo.payments

                    $scope.calcTotalPaid = function (paymentsFor) {
                        var totalPaid = 0;
                        for (var i = 0; i < paymentsFor.length; i++) {
                            totalPaid += paymentsFor[i].paymentAmount;
                        } return totalPaid;
                    }

                    console.log($scope.calcTotalPaid($scope.billInfo.payments))

                    $scope.balanceDue = $scope.total - $scope.calcTotalPaid($scope.billInfo.payments);

                    var today = Date.now();
                    var dueDate = new Date($scope.billInfo.dateDue);
                    console.log(dueDate);
                    dueDate = dueDate.getTime();

                    var days = today - dueDate;

                    days = days / 86400000;

                    $scope.daysPastDue = Math.floor(days);

                    return $scope.billInfo;

                })
                $scope.billModalShown = !$scope.billModalShown
            } else {
                $scope.billModalShown = !$scope.billModalShown
            }
        };



        // $scope.totalPaid = function () {
        //     return $scope.payments.reduce(function (current, payment) { return current + payments.length; }, 0);
        // };

        console.log($scope.billInfo)

        $scope.makePayment = function (paymentInfo, billId) {
            console.log("hitting here")
            practiceStaffService.makePayment(paymentInfo, billId)
                .then(function (response) {
                    console.log(response);
                    $scope.payment = "";
                    billService.getBill(billId).then(function (response) {
                        console.log(response);
                        $scope.billInfo = response.data;
                    })
                })
        }


    });