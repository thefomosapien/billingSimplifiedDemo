angular.module('app')
	.directive('amtBilledChart', function(){

		return {
			scope: {
				chartData: '='
			},
			templateUrl: './JS/directives/charts/amtBilledChart.html',
			link: function(scope, element, attrs){

				var amtBilledChartData = scope.chartData;
				
				var data = [
					{date: new Date("10/15/2014"), value: 2},
					{date: new Date("10/14/2014"), value: 1},
					{date: new Date("10/10/2014"), value: 8},
					{date: new Date("10/07/2014"), value: 5},
					{date: new Date("10/05/2014"), value: 2},
					{date: new Date("10/04/2014"), value: 0},
					{date: new Date("10/03/2014"), value: 0},
					{date: new Date("10/02/2014"), value: 10},
					{date: new Date("10/01/2014"), value: 1},
				];

				function calcBarName(d) {
					return (d.date.getDate()) + "/" + (d.date.getMonth() + 1);
				}

				function calcBarHeight(d) { return innerHeight - yScale(d.value); }

				var width = 576,
					height = 300,
					margin = {top: 20, right: 30, bottom: 30, left: 40},
					innerHeight = height - margin.top - margin.bottom,
					innerWidth = width - margin.left - margin.right,
					yScale = d3.scale.linear()
						.domain([0, d3.max(data, function (d) { return d.value; })])
						.range([innerHeight, 0]),
					xScale = d3.scale.ordinal()
						.domain(data.map(calcBarName))
						.rangeRoundBands([0, innerWidth], .05, 0.2),
					xAxisDef = d3.svg.axis()
						.scale(xScale)
						.orient("bottom"),
					yAxisDef = d3.svg.axis()
						.scale(yScale)
						.orient("left")
						.ticks(5);

				//add the chart container
				var chart = d3.select(".amt-billed-chart")
					.attr("width", width)
					.attr("height", height)
				  .append("g") //becomes the container
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				//add the bars
				var bars = chart.selectAll("g")
					.data(data)
				  .enter().append("g")
					.attr("class", "chart-bar")
					.attr("transform", function (d, i) {
						return "translate(" + xScale(calcBarName(d)) + ",0)";
					});

				//fill in the bars with color and do nice rising transition
				var rect = bars.append("rect")
					.attr("y", innerHeight) //setting y at the bottom for the transition effect
					.attr("height", 0)      //setting height 0 for the transition effect
					.attr("width", xScale.rangeBand())
					.style("fill", "rgb(234, 229, 229)")
					.transition()
						.duration(800)
						.ease("linear")
						.attr("height", calcBarHeight)
						.attr("y", function(d){return yScale(d.value);})
						.style("fill", "rgb(70, 130, 180)");
						// .style("fill", "rgb(69, 177, 203)");

				//add the x axis to the chart
				var xAxis = chart.append("g")
					.attr("class", "x-axis axis")
					.attr("transform", "translate(0," + innerHeight + ")")
					.call(xAxisDef);

				//add the y axis to the chart
				var yAxis = chart.append("g")
					.attr("class", "y-axis axis")
					.call(yAxisDef)
				  .append("text")
					.attr("transform", "rotate(-90)")
					.attr("class", "axis-text")
					.attr("y", 10)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Entries");

			}

		};

	});
