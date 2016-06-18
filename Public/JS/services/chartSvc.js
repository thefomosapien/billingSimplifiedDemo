angular.module("app")
	.service("chartService", function ($http) {

		this.getDailyChartData = function(practiceId, dailyDate) {
			return $http({
				method: 'GET',
				url: '/get/dailyChartData?practiceId=' + practiceId + '&&date=' + dailyDate
			}).then(function(response){
				return response.data;
			});
		};

		this.getWeeklyChartData = function(practiceId, weekStartDate, currentMDY) {
			return $http({
				method: 'GET',
				url: '/get/weeklyChartData?practiceId=' + practiceId + '&&weekStartDate=' + weekStartDate + '&&weekEndDate=' + currentMDY
			}).then(function(response){
				return response;
			});
		};

		this.getMonthlyChartData = function(practiceId, monthStartDate, monthEndDate) {
			return $http({
				method: 'GET',
				url: '/get/monthlyChartData?practiceId=' + practiceId + '&&startMonth=' + monthStartDate + '&&endMonth=' + monthEndDate
			}).then(function(response){
				return response;
			});
		};

	});