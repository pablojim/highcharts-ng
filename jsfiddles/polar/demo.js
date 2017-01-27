$(function () {
//See: https://github.com/pablojim/highcharts-ng
  var myapp = angular.module('myapp', ["highcharts-ng"]);

  myapp.controller('myctrl', function ($scope) {

    $scope.addPoints = function () {
      var seriesArray = $scope.chartConfig.series
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    var series = 0;
    $scope.addSeries = function () {
      var rnd = []
      for (var i = 0; i < 10; i++) {
        rnd.push(Math.floor(Math.random() * 20) + 1)
      }
      $scope.chartConfig.series.push({
        data: rnd,
        id: 'series_' + series++
      })
    }

    $scope.removeRandomSeries = function () {
      var seriesArray = $scope.chartConfig.series
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
      this.chartConfig.chart.polar = !this.chartConfig.chart.polar;

    }

    $scope.chartConfig = {
      chart: {
        polar: true
      },

      title: {
        text: 'Highcharts Polar Chart'
      },

      pane: {
        startAngle: 0,
        endAngle: 360
      },

      xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
          formatter: function () {
            return this.value + '°';
          }
        }
      },

      yAxis: {
        min: 0
      },

      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 45
        },
        column: {
          pointPadding: 0,
          groupPadding: 0
        }
      },

      series: [{
        type: 'column',
        name: 'Column',
        data: [8, 7, 6, 5, 4, 3, 2, 1],
        pointPlacement: 'between'
      }, {
        type: 'line',
        name: 'Line',
        data: [1, 2, 3, 4, 5, 6, 7, 8]
      }, {
        type: 'area',
        name: 'Area',
        data: [1, 8, 2, 7, 3, 6, 4, 5]
      }]
    }

  });
})
