angular.module('app')
	.directive('patientsChart', function(){

		return {
			scope: {
				chartData: '='
				// patientsChartData: "="
			},
			templateUrl: './JS/directives/charts/patientsChart.html',
			link: function($scope, element, attrs){

				// $scope.patientsChartData = $scope.chartData;	// So $scope.chartData's values aren't changed in the view by what happens here.
				
				// var data = [
				// 	{ "date": "2015-11", "Total": "69", "New": "8" }, // "Prior": "61"
				// 	{ "date": "2015-12", "Total": "62", "New": "5" },
				// 	{ "date": "2016-01", "Total": "56", "New": "7" },
				// 	{ "date": "2016-02", "Total": "68", "New": "9" },
				// 	{ "date": "2016-03", "Total": "50", "New": "4" },
				// 	{ "date": "2016-04", "Total": "61", "New": "8" },
				// 	{ "date": "2016-05", "Total": "62", "New": "7" },
				// 	{ "date": "2016-06", "Total": "71", "New": "10" }
				// ];

				// var makeObjLean = function(arr) {
				// 	var keyKeep = ['patientTotalPatients', 'patientNewPatients', 'date'];
				// 	for (var i = 0; i < arr.length; i++) {
				// 		var obj = arr[i];
				// 		for (var key in obj) {
				// 			if (keyKeep.indexOf(key) === -1) {
				// 				delete obj[key];
				// 			}
				// 		}
				// 	}
				// 	return arr;
				// };

				$scope.$watch('chartData', function(newVal) {
					
					var data = newVal;
					// var data = newVal.data;
					// var type = newVal.type;
					// makeObjLean(data);
					// console.log(data);

					d3.selectAll('.patients-chart > *').remove();

					// STYLING //
					var margin = {top: 40, right: 45, bottom: 40, left: 50},
						width = 576 - margin.left - margin.right,
						height = 300 - margin.top - margin.bottom;
					// CREATE CHART CONTAINER //
					var svg = d3.select(".patients-chart")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					  .append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					if (!newVal) { return; }

					// function runPatientsChart(data, type) {
					function runPatientsChart(data) {

						var parseDate = d3.time.format.iso.parse;

						var x = d3.time.scale()
							.range([0, width]);

						var y = d3.scale.linear()
							.range([height, 0]);

						var color = d3.scale.category10();
						// var colorArea = d3.scale.category();
						var colorArea = d3.scale.ordinal()
							.range(["#2898E5", "#fdae6b"]);

						var xAxis = d3.svg.axis()
							.scale(x)
							.orient("bottom")
							.ticks(d3.time.week).tickFormat(d3.time.format("%a"));
							// .ticks(function(type){
							// 	if (type === 'day') { return d3.time.day; }
							// 	else if (type === 'week') { return d3.time.week; }
							// 	else if (type === 'month') { return d3.time.month; }
							// })
							// .tickFormat(function(type) {
							// 	if (type === 'day') { return d3.time.format("%x"); }
							// 	else if (type === 'week') { return d3.time.format("%m/%d"); }
							// 	else if (type === 'month') { return d3.time.format("%b"); }
							// });

						var yAxis = d3.svg.axis()
							.scale(y)
							.orient("left");

						var area = d3.svg.area()
							.interpolate("cardinal")
							.x(function(d) { return x(d.date); })
							.y0(height)
							.y1(function(d) { return y(d.numPatients); });
							// .y1(function(d) { return y(d.close); });

						var line = d3.svg.line()
							.interpolate("cardinal")
							.x(function(d) { return x(d.date); })
							.y(function(d) { return y(d.numPatients); });

						color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

						data.forEach(function(d) {
							d.date = parseDate(d.date);
							// d.close = +d.close;
						});

						var patients = color.domain().map(function(name) {
							return { name: name, values: data.map(function(d) {
								return {date: d.date, numPatients: +d[name]};
							})};
						});

						x.domain(d3.extent(data, function(d) { return d.date; }));

						y.domain([
							d3.min(patients, function(c) { return d3.min(c.values, function(v) { return v.numPatients; }); }),
							d3.max(patients, function(c) { return d3.max(c.values, function(v) { return v.numPatients; }); })
						]);

						svg.append("g")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis);

						svg.append("g")
							.attr("class", "y axis")
							.call(yAxis)
						  .append("text")
							.attr("transform", "rotate(-90)")
							.attr("y", -44)
							.attr("x", -90)
							.attr("dy", ".71em")
							.style("text-anchor", "end")
							.text("# Patients");

						var patient = svg.selectAll(".patient")
							.data(patients);

						patient.enter().append("g")
							.attr("class", "patient");
							// .attr("y", -60)
							// .attr("x", function(d, i) { return i * 32; })
							// .style("fill-opacity", 1e-6)
						 //  .transition()
						 //  	.duration(750)
						 //  	.attr("y", 0)
							// .style("fill-opacity", 1);

						patient.append("path")
							.attr("class", "area")
							.attr("d", function(d) { return area(d.values); })
							.style("stroke-width", "0")
							.style("fill", function(d) { return colorArea(d.name); });

						patient.append("path")
							.attr("class", "line")
							.attr("d", function(d) { return line(d.values); })
							.style("stroke", function(d) { return color(d.name); })
							.style("stroke-width", "3px")
							.style("fill", "none");

						patient.append("text")
							.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
							.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.numPatients) + ")"; })
							.attr("x", 4)
							.attr("dy", ".35em")
							.style("fill", function(d) { return color(d.name); })
							.text(function(d) { return d.name; });

					}

					// runPatientsChart(data, type);
					runPatientsChart(data);

				}, true);

			}

		};

	});
