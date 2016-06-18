var Chart = require('./../Models/Charts');

module.exports = {
	createChartData: function(req, res, next){
		console.log("hitting new chart", req.body);	// CHANGE TO REQ.QUERY
		var newChart = new Chart(req.body);
		newChart.save(function(err, result){
			if (err) {
				res.status(500 + 'createChartData function error').json(err);
			} else {
				res.status(200).json(result);
			}
		});
	},
	getDailyChartData: function(req, res, next){
		var date = new Date(req.query.date);
		var endOfToday = new Date(req.query.date);
		endOfToday.setDate(endOfToday.getDate() + 1);

		Chart.find({"practiceId": req.query.practiceId, "date": {"$gte": date, "$lt": endOfToday}})
		.exec(function(err, result){
			if (err) {
				res.status(500 + "getDailyChartData function error").json(err);
			} else {
				res.status(200).json(result);
			}
		});
	},
	getWeeklyChartData: function(req, res, next){
		var xDaysPrev = new Date(req.query.weekStartDate);
		var endOfToday = new Date(req.query.weekEndDate);
		endOfToday.setDate(endOfToday.getDate() + 1);

		Chart.find({"practiceId": req.query.practiceId, "date": {"$gte": xDaysPrev, "$lt": endOfToday}})
		.exec(function(err, result){
			if (err) {
				res.status(500 + "getWeeklyChartData function error").json(err);
			} else {
				console.log(result);
				var sortDescDate = function(arr) {	// sort array with highest date first [0]
					arr.sort(function(a, b){
						var c = new Date(a.date);
						var d = new Date(b.date);
						return d - c;
					});
					return arr;
				};
				sortDescDate(result);
				console.log(result);
				res.status(200).json(result);
			}
		});
	},

	getMonthlyChartData: function(req, res, next){

		Chart.find({"practiceId": req.query.practiceId, "date": {"$gte": startMonthDate, "$lt": endMonthDate}})
		.exec(function(err, result){
			if (err) {
				res.status(500 + "getMonthlyChartData function error").json(err);
			} else {
				res.status(200).json(result);
			}
		});
	},
	getChartDataById: function(req, res, next){
		Chart.findById(req.params.id).exec(function(err, result){
			if (err) {
				res.status(500 + "getChartDataById function error").json(err);
			} else {
				res.status(200).json(result);
				console.log(result);
			}
		});
	},
	deleteChartData: function(req, res, next){
		Chart.findByIdAndRemove(req.params.id).exec(function(err, result){
			console.log(req.params.id);
			if (err) {
				console.log(err);
				res.status(500 + 'deleteChartData function error').json(err);
			} else {
				res.status(200).json(result);
			}
		});
	},
	updateChartData: function(req, res, next){

		Chart.findByIdAndUpdate(req.params.id, req.body).exec(function(err, result){
console.log("HERE", req.params.id);
console.log("HERE", req.body);
			// console.log(req.body);
			// console.log(req.params);
			if (err) {
				res.status(500 + 'updateChartData function error');
			} else {
				res.status(200).json(result);
				console.log("RESULT", result);
			}
		});
	}
};
