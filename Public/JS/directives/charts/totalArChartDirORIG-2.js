// angular.module('app')
// 	.directive('totalArChart', function(){

// 		return {
// 			scope: {
// 				chartData: '='
// 				// dailyArChartData: '=',
// 				// weeklyArChartData: '=',
// 				// monthlyArChartData: '='
// 			},
// 			templateUrl: './JS/directives/charts/totalArChart.html',
// 			link: function($scope, element, attrs){

// 				console.log($scope.chartData);

// 				$scope.totalArChartData = $scope.chartData;	// So $scope.chartData's values aren't changed in the view by what happens here.

// 				var makeObjLean = function(arr) {
// 					var keyKeep = ['ARcurrent', 'ARninetyUp', 'ARsixtyNinety', 'ARthirtySixty', 'date'];
// 					for (var i = 0; i < arr.length; i++) {
// 						var obj = arr[i];
// 						for (var key in obj) {
// 							if (keyKeep.indexOf(key) === -1) {
// 								delete obj[key];
// 							}
// 						}
// 					}
// 					return arr;
// 				};

// 				$scope.$watch("chartData", function(newVal) {

// 					console.log(newVal);
// 					var data = newVal.data;
// 					var type = newVal.type;
// 					makeObjLean(data);
// 					console.log(data);

// 				// var runTotalArChart = function(data, type) {
// 					// STYLING
// 					var margin = {top: 40, right: 60, bottom: 40, left: 50},
// 						width = 576 - margin.left - margin.right,
// 						height = 300 - margin.top - margin.bottom;

// 					var formatPercent = d3.format(".0%");
// 					// var parseDate = d3.time.format("%Y-%m-%d").parse;
// 					// var parseDate = d3.time.format("%a %b %d %Y %H:%M:%S GMT%Z (MDT)").parse;
// 											// Wed Jun 15 2016 00:00:00 GMT-0600 (MDT)
// 					var parseDate = d3.time.format.iso.parse;

// 					var x = d3.time.scale()
// 						.range([0, width]);

// 					var y = d3.scale.linear()
// 						.range([height, 0]);

// 					// var color = d3.scale.category10();
// 					var color = d3.scale.ordinal()
// 						.range(["#1F77B4", "#F7E100", "#FF7F0E", "#D62728"]);

// 					var xAxis = d3.svg.axis()
// 						.scale(x)
// 						.orient("bottom")
// 						// .ticks(d3.time.month).tickFormat(d3.time.format("%b"));
// 						.ticks(d3.time.month).tickFormat(function(d) {
// 							if (type === 'day') { return d3.time.format("%x"); }
// 							else if (type === 'week') { return d3.time.format("%m/%d"); }
// 							else if (type === 'month') { return d3.time.format("%b"); }
// 						});

// 					var yAxis = d3.svg.axis()
// 						.scale(y)
// 						.orient("left")
// 						.tickFormat(formatPercent);

// 					var line = d3.svg.area()
// 						.interpolate("cardinal")
// 						.x(function(d) { return x(d.date); })
// 						.y0(function(d) { return y(d.y); })
// 						.y1(function(d) { return y(d.y); });

// 					function line_to_stacked(t) {
// 						return d3.svg.area()
// 							.interpolate("cardinal")
// 							.x(function(d) { return x(d.date); })
// 							.y0(function(d) { return y(t * d.y0 + d.y); })
// 							.y1(function(d) { return y(t * d.y0 + d.y); });
// 					}

// 					function area_to_stacked(t) {
// 						return d3.svg.area()
// 							.interpolate("cardinal")
// 							.x(function(d) { return x(d.date); })
// 							.y0(function(d) { return y(d.y0 + (1 - t) * d.y); })
// 							.y1(function(d) { return y(d.y0 + d.y); });
// 					}

// 					var stack = d3.layout.stack()
// 						.values(function(d) { return d.values; });

// 					// CREATE CHART CONTAINER //
// 					var svg = d3.select(".total-ar-chart")
// 						.attr("width", width + margin.left + margin.right)
// 						.attr("height", height + margin.top + margin.bottom)
// 					  .append("g")
// 						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 					// DEFINITIONS
// 					color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

// 					data.forEach(function(d) {
// 						d.date = parseDate(d.date);
// 					});

// 					var collPeriods = stack(color.domain().map(function(name) {
// 						return { name: name, values: data.map(function(d) {
// 							return {date: d.date, y: d[name] / 100};
// 						})};
// 					}));

// 					x.domain(d3.extent(data, function(d) { return d.date; }));

// 					var collPeriod = svg.selectAll(".collPeriod")
// 						.data(collPeriods)
// 					  .enter().append("g")
// 						.attr("class", "collPeriod");

// 					collPeriod.append("path")
// 						.attr("class", "area")
// 						.attr("d", function(d) { return line(d.values); })
// 						.style("stroke", function(d) { return color(d.name); })
// 						.style("stroke-width", "3px")
// 						.style("fill", function(d) { return color(d.name); });
// 					collPeriod.append("text")
// 						.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
// 						.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y) + ")"; })
// 						.attr("x", 4)
// 						.attr("dy", ".35em")
// 						.style("fill", function(d) { return color(d.name); })
// 						.text(function(d) { return d.name; });

// 					svg.append("g")
// 						.attr("class", "x axis")
// 						.attr("transform", "translate(0," + height + ")")
// 						.call(xAxis);
// 					svg.append("g")
// 						.attr("class", "y axis")
// 						.call(yAxis);

// 					// TRANSITIONS //
// 					var is_area_plot = false;
// 					function transitionLineStacked () {
// 						var duration = 1500;
// 						var collPeriod = svg.selectAll(".collPeriod");
// 						var transition = collPeriod.transition()
// 							.delay(function(d, i) { return i * 500; })
// 							.duration(duration);
// 						var postTransition = transition.transition();
// 						if (!is_area_plot) {
// 							transition.selectAll("path")
// 								.attrTween("d", shapeTween(line_to_stacked, 1));
// 							transition.selectAll("text")
// 								.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y) + ")"; });
// 							postTransition.selectAll("path")
// 								.attrTween("d", shapeTween(area_to_stacked, 1))
// 								.style("stroke-opacity", 0.0);
// 							postTransition.selectAll("text")
// 								.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; });
// 						} else {
// 							transition.selectAll("path")
// 								.style("stroke-opacity", 1.0)
// 								.attrTween("d", shapeTween(area_to_stacked, 0));
// 							transition.selectAll("text")
// 								.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y) + ")"; });
// 							postTransition.selectAll("path")
// 								.attrTween("d", shapeTween(line_to_stacked, 0));
// 							postTransition.selectAll("text")
// 								.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y) + ")"; });
// 						}
// 						is_area_plot = !is_area_plot;
// 					}

// 					function shapeTween(shape, direction) {
// 						return function(d, i, a) {
// 							return function(t) {
// 								return shape(direction ? t : 1.0 - t)(d.values);
// 							};
// 						};
// 					}

// 				// };

// 				});

// 			}

// 		};

// 	});
