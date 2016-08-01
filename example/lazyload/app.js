/**
 * Simple highcharts-ng maps example.
 */
angular
  .module('app', ['highcharts-ng-lazyload'])
  .config(['highchartsNGProvider', function (highchartsNGProvider) {
    highchartsNGProvider.lazyLoad([highchartsNGProvider.HIGHCHART, "maps/modules/map.js", "mapdata/custom/world.js"]);
  }])
  .controller('MapController', function (highchartsNG, $scope) {
    var countries = {
        europe: 'France, Germany, Russia',
        asia: 'Japan, China'
      },
      defaultSeriesData = {
        allAreas: false,
        name: '',
        countries: '',
        data: [],
        dataLabels: {
          enabled: true,
          color: 'white',
          formatter: function () {
            if (this.point.value) {
              return this.point.name;
            }
          }
        },
        tooltip: {
          enabled: true,
          headerFormat: '',
          pointFormat: '{point.name}: <b>{series.name}</b>'
        }
      };

    this.makeSeries = function (name, countries) {
      var seriesData = angular.copy(defaultSeriesData);

      seriesData.name = name;
      seriesData.countries = countries;
      seriesData.data = this.makeSeriesData(countries);

      return seriesData;
    };

    this.makeSeriesData = function (string) {
      var list = ('' + string).split(','),
        data = [];

      angular.forEach(list, function (country) {
        data.push({
          name: country.replace(/^\s+|\s+$/, ''),
          value: 1
        });
      });

      return data;
    };

    this.setSeriesData = function (series, string) {
      series.data = this.makeSeriesData(string);
    };

    this.addSeries = function () {
      $scope.chartConfig.series.push(this.makeSeries());
    };

    this.removeSeries = function (key) {
      $scope.chartConfig.series.splice(key, 1);

      if (1 == $scope.chartConfig.series.length) {
        $scope.chartConfig.series[0].allAreas = true;
      }
    };
    $scope.chartConfig = {
      options: {
        legend: {
          enabled: false
        },
        plotOptions: {
          
        },
      },
      chartType: 'map',
      title: {
        text: 'Highcharts-ng map example'
      },
      series: [
              this.makeSeries('Europe', countries.europe),
              this.makeSeries('Asia', countries.asia)
          ]
    };

    $scope.chartConfig.series[0].allAreas = true;
    highchartsNG.getHighcharts().then(function(Highcharts){
      $scope.chartConfig.options.plotOptions.map = {
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['name']
      };
    });
  });
