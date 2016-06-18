angular.module("app")
	.controller('billingAdminCtrl', function($scope, billingAdminService, toaster, chartService, orderByFilter) {

	    $scope.clinicAdded = true; //this keeps the "create new user for clinic" div hidden until a new clinic is added
	    $scope.addNewStaff = true; //
	    $scope.showAddNewStaff = function() {
	        $scope.addNewStaff = !$scope.addNewStaff;
	    };

	    $scope.practiceData = {};
	    // Get currentMDY and sixDaysPrevMDY for daily and weekly charts
		$scope.currentMDY = new Date(new Date().setHours(0, 0, 0, 0));
		$scope.practiceData.date = new Date(new Date().setHours(0, 0, 0, 0));
		var sixDaysPrev = new Date(new Date().setHours(0, 0, 0, 0));
		sixDaysPrev.setDate(sixDaysPrev.getDate() - 6);
		$scope.weekStartDate = sixDaysPrev;

		// Daily Date button toggles daily date field
		$scope.dailyDateIsVisible = false;
		$scope.showHideDailyDate = function() {
			$scope.dailyDateIsVisible = $scope.dailyDateIsVisible ? false : true;
		};
		// Weekly Range button toggles weekly range - two input date fields
		$scope.weeklyRangeIsVisible = false;
		$scope.showHideWeeklyRange = function() {
			$scope.weeklyRangeIsVisible = $scope.weeklyRangeIsVisible ? false : true;
		};
		// Monthly Range button toggles monthly range - two input date fields
		$scope.monthlyRangeIsVisible = false;
		$scope.showHideMonthlyRange = function() {
			$scope.monthlyRangeIsVisible = $scope.monthlyRangeIsVisible ? false : true;
		};

	    // ****** PRACTICE CRUD ******
	    $scope.createNewPractice = function(newPractice) {
	        billingAdminService.createNewPractice(newPractice)
	            .then(function(response) {
	                $scope.newPractice = "";
	                $scope.practiceId = response._id;
	                $scope.practiceName = response.name;
	                $scope.clinicAdded = true;
	                toaster.pop('success', "Successfully Created " + response.name);
	                getPractices();
	            });
	    };
	    var getPractices = function() {
	        billingAdminService.getPractices()
		        .then(function(response) {
		            $scope.practices = response.data;
		        });
	    };
	    getPractices();

	    $scope.deletePractice = function(id) {
	        if (confirm("Are you sure you want to delete this Practice from the database?")) {
	            billingAdminService.deletePractice(id)
	                .then(function(response) {
	                    toaster.pop('success', "Successfully Deleted Practice");
	                    getPractices();
	                });
	        }
	    };
	    $scope.createNewUser = function(newUser, practiceId) {
	        billingAdminService.createNewUser(newUser, practiceId)
	            .then(function(response) {
	                toaster.pop('success', "Successfully Created " + response.data.firstName + " " + response.data.lastName);
	                console.log("new User", response);
	            });
	        $scope.newUser = "";
	    };

	    $scope.hidden = true;
	    $scope.unhidden = function(practice) {
	        $scope.hidden = !$scope.hidden;
	        $scope.chosenClinic = practice;
	        $scope.praxId = practice._id;
	    };

		$scope.submitPracticeData = function(practiceData, practiceId) {
			billingAdminService.submitPracticeData(practiceData, practiceId)
				.then(function(response) {
					toaster.pop('success', "Successfully Added Chart Data");
					console.log(response);
					return response;
				});
		};

		$scope.updatePracticeData = function(practiceData, chosenClinic){
			billingAdminService.updatePracticeData(practiceData, chosenClinic)
				.then(function(response){
					$scope.cat = response;
					console.log($scope.cat);
					console.log($scope.chosenClinic);
				});
		};

	    // ****** CHART QUERIES ******

		var arKeysObj = function(arr) {
			// var newArr = [];
			var keyKeep = ['ARcurrent', 'ARninetyUp', 'ARsixtyNinety', 'ARthirtySixty', 'date'];
			for (var i = 0; i < arr.length; i++) {
				var obj = arr[i];
				for (var key in obj) {
					if (keyKeep.indexOf(key) === -1) {
						delete obj[key];
					}
				}
			}
			// Array.prototype.push.apply(newArr, arr);
			// return newArr;
			return arr;
		};

		var patientsKeysObj = function(arr) {
			var keyKeep = ['patientTotalPatients', 'patientNewPatients', 'date'];
			for (var i = 0; i < arr.length; i++) {
				var obj = arr[i];
				for (var key in obj) {
					if (keyKeep.indexOf(key) === -1) {
						delete obj[key];
					}
				}
			}
			return arr;
		};

		// var patientsKeysMEGAObj = function(arr) {
		// 	newArr = [];
		// 	newObj = {};
		// 	var keyKeep = ['patientTotalPatients', 'patientNewPatients', 'date'];
		// 	for (var i = 0; i < arr.length; i++) {
		// 		newArr.push(newObj);
		// 		var obj = arr[i];
		// 		for (var key in obj) {
		// 			if (keyKeep.indexOf(key) === -1) {
		// 				var tKey = keyKeep.indexOf(key);
		// 				// delete obj[key];
		// 				newArr[i].tKey = obj.key;
		// 				// add obj.key to newObj[key] // add value to new property
		// 			}
		// 		}
		// 	}
		// 	return newArr;
		// };

		var billedKeysObj = function(arr) {
			var keyKeep = ['totalBilled', 'billedPerPatient', 'date'];
			for (var i = 0; i < arr.length; i++) {
				var obj = arr[i];
				for (var key in obj) {
					if (keyKeep.indexOf(key) === -1) {
						delete obj[key];
					}
				}
			}
			return arr;
		};


		$scope.chartData = {};

		$scope.getAllChartData = function(practiceId, currentMDY, weekStartDate, monthStartDate, monthEndDate) {
			$scope.getDailyChartData(practiceId, currentMDY);
			$scope.getWeeklyChartData(practiceId, weekStartDate, currentMDY);
			// $scope.getMonthlyChartData(practiceId, monthStartDate, monthEndDate);
		};

		$scope.getDailyChartData = function(practiceId, currentMDY) {
			$scope.backupDate = currentMDY;
			chartService.getDailyChartData(practiceId, currentMDY)
				.then(function(response) {
					console.log(response);
					if (!$.trim(response)) {
						$scope.practiceData = { date: $scope.backupDate , ARcurrent: '', ARthirtySixty: '', ARsixtyNinety: '', ARninetyUp: '', insuranceARcurrent: '', insuranceARthirtySixty: '', insuranceARsixtyNinety: '', insuranceARninetyUp: '', patientARCurrent: '', patientARThirtySixty: '', patientARSixtyNinety: '', patientARNinetyUp: '', patientTotalPatients: '', patientNewPatients: '', totalBilled: '', billedPerPatient: '' };
					} else {
						$scope.practiceData = response[0];
						$scope.chartData.type = 'day';
						$scope.chartData.data = response[0];

						// $scope.arChartData = arKeysObj(response.data);
						// $scope.patientsChartData = patientsKeysObj(response.data);
						// $scope.billedChartData = billedKeysObj(response.data);
					}
					// console.log($scope.practiceData.date);
				});
		};

		$scope.getWeeklyChartData = function(practiceId, weekStartDate, currentMDY) {
			chartService.getWeeklyChartData(practiceId, weekStartDate, currentMDY)
				.then(function(response) {

					// var patientSimple = patientsKeysMEGAObj(response.data);
					// console.log(patientSimple);
					// var respArr1 = response.data.slice();
					// var respArr2 = response.data.slice();
					// var respArr3 = response.data.slice();
					// $scope.arChartData = arKeysObj(response.data);
					$scope.patientsChartData = patientsKeysObj(response.data);
					// $scope.billedChartData = billedKeysObj(response.data);
					// console.log($scope.arChartData);
					// console.log($scope.patientsChartData);
					// console.log($scope.billedChartData);
					console.log(response);
					// $scope.chartData.type = 'week';
					// $scope.chartData.data = response.data;
					// $scope.arChartData.type = 'week';
					// $scope.patientsChartData.type = 'week';
					// $scope.billedChartData.type = 'week';
				});
		};

		$scope.getMonthlyChartData = function(practiceId, monthStartDate, monthEndDate) {
			chartService.getMonthlyChartData(practiceId, monthStartDate, monthEndDate)
				.then(function(response) {
					// $scope.monthlyChartData = response;
					$scope.chartData.type = 'twelveMonths';
					$scope.chartData.data = response.data;
				});
		};

	});
