//See: https://github.com/pablojim/highcharts-ng

$(function () {
  var myapp = angular.module('myapp', ["highcharts-ng"]);

  myapp.controller('myctrl', function ($scope) {

    $scope.addPoints = function () {
      var seriesArray = $scope.chartConfig.series;
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
    };

    var seriesIdx = 0;
    var yAxisIdx = 0;
    $scope.addYAxisFromSeries = function(seriesData) {
        /*
            Adds a Y Axis given seriesData (Array)
        */
        yAxisIdx += 1;
        $scope.chartConfig.yAxis.push({
            min: Math.min.apply(null, seriesData),
            max: Math.max.apply(null, seriesData),
            title: {
                text: "Y-Axis" + yAxisIdx.toString()
            },
            id: 'yAxis_' + yAxisIdx
        });
    };

    $scope.addSeries = function () {
      seriesIdx += 1;
      var rnd = [];
      for (var i = 0; i < 10; i++) {
        rnd.push(Math.floor(Math.random() * 20) + 1);
      }
      $scope.addYAxisFromSeries(rnd);
      $scope.chartConfig.series.push({
        data: rnd,
        yAxis: 'yAxis_' + yAxisIdx,
        id: 'series_' + seriesIdx
      });
    }

    $scope.removeRandomSeries = function () {
      var seriesArray = $scope.chartConfig.series;
      var yAxisArray = $scope.chartConfig.yAxis;
      var rndIdx = Math.floor(Math.random() * seriesArray.length);
      seriesArray.splice(rndIdx, 1);
      yAxisArray.splice(rndIdx, 1);
    }

    $scope.chartConfig = {
      chart: {
        type: 'line'
      },
      navigator: {
          enabled: true
      },
      series: [{
        data: [10, 15, 12, 8, 7, 3, 5, 7, 10, 12, 5],
        yAxis: 'yAxis_0',
        id: 'series_0'
      }],
      title: {
        text: 'Hello'
      },
      xAxis: [{
        type: 'datetime'
      }],
      yAxis: [{ // Primary yAxis
        title: {
          text: 'number of notification',
        },
        id: 'yAxis_0'
      }],
    };

  });
})
