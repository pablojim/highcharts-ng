/**
 * highcharts-ng
 * @version v0.0.14-dev - 2016-11-18
 * @link https://github.com/pablojim/highcharts-ng
 * @author Barry Fitzgerald <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'highcharts-ng';
}

(function () {
  'use strict';
  /*global angular: false, Highcharts: false */


  angular.module('highcharts-ng', [])
    .factory('highchartsNG', ['$q', '$window', highchartsNG])
    .directive('highchart', ['highchartsNG', '$timeout', highchart]);

  function prependMethod(obj, method, func) {
    var original = obj[method];
    obj[method] = function () {
      var args = Array.prototype.slice.call(arguments);
      func.apply(this, args);
      if (original) {
        return original.apply(this, args);
      } else {
        return;
      }

    };
  }

  function deepExtend(destination, source) {
    //Slightly strange behaviour in edge cases (e.g. passing in non objects)
    //But does the job for current use cases.
    if (angular.isArray(source)) {
      destination = angular.isArray(destination) ? destination : [];
      for (var i = 0; i < source.length; i++) {
        destination[i] = deepExtend(destination[i] || {}, source[i]);
      }
    } else if (angular.isObject(source)) {
      destination = angular.isObject(destination) ? destination : {};
      for (var property in source) {
        destination[property] = deepExtend(destination[property] || {}, source[property]);
      }
    } else {
      destination = source;
    }
    return destination;
  }

  function highchartsNG($q, $window) {
    var highchartsProm = $q.when($window.Highcharts);

    function getHighchartsOnce() {
      return highchartsProm;
    }

    return {
      getHighcharts: getHighchartsOnce,
      ready: function ready(callback, thisArg) {
        getHighchartsOnce().then(function() {
          callback.call(thisArg);
        });
      }
    };
  }

  function highchart(highchartsNGUtils, $timeout) {

    // acceptable shared state
    var seriesId = 0;
    var ensureIds = function (series) {
      var ids = [];
      angular.forEach(series, function(s) {
        if (!angular.isDefined(s.id)) {
          s.id = 'series-' + seriesId++;
        }
        ids.push(s.id);
      });
      return ids;
    };

    // immutable
    var axisNames = [ 'xAxis', 'yAxis' ];
    var chartTypeMap = {
      'stock': 'StockChart',
      'map':   'Map',
      'chart': 'Chart'
    };

    var getMergedOptions = function (scope, element, config) {
      var mergedOptions = {};

      var defaultOptions = {
        chart: {
          events: {}
        },
        title: {},
        subtitle: {},
        series: [],
        credits: {},
        plotOptions: {},
        navigator: {enabled: false},
        xAxis: {
          events: {}
        },
        yAxis: {
          events: {}
        }
      };

      if (config) {
        //check all series and axis ids are set
        if(config.series) {
          ensureIds(config.series);
        }

        mergedOptions = deepExtend(defaultOptions, config);
      } else {
        mergedOptions = defaultOptions;
      }
      mergedOptions.chart.renderTo = element[0];

      //check chart type is set


      return mergedOptions;
    };

    var getChartType = function(scope) {
      if (scope.config === undefined || scope.config.chartType === undefined) return 'Chart';
      return chartTypeMap[('' + scope.config.chartType).toLowerCase()];
    };

    function linkWithHighcharts(Highcharts, scope, element, attrs) {
      // We keep some chart-specific variables here as a closure
      // instead of storing them on 'scope'.


      // chart is maintained by initChart
      var chart = false;

      var initChart = function() {
        if (chart) chart.destroy();
        var config = scope.config || {};
        var mergedOptions = getMergedOptions(scope, element, config);
        var chartType = getChartType(scope);

        chart = new Highcharts[chartType](mergedOptions);

        config.getChartObject = function() {
          return chart;
        };

      };
      initChart();

      var watcher;
      if(scope.customWatch) {
        if(angular.isFunction(scope.customWatch)) {
          watcher = function() {
            return scope.customWatch(scope);
          };
        } else {
          watcher = scope.customWatch;
        }
      } else {
        watcher = 'config';
      }

      scope.$watch(watcher, function (newConfig, oldConfig) {
        if (newConfig === oldConfig) return;
        if (newConfig.series) {
          var ids = ensureIds(newConfig.series);
          //Remove any missing series
          for (var i = chart.series.length - 1; i >= 0; i--) {
            var s = chart.series[i];
            if (s.options.id !== 'highcharts-navigator-series' && ids.indexOf(s.options.id) < 0) {
              s.remove(false);
            }
          }
          // Add any new series
          angular.forEach(newConfig.series, function(s) {
            if (!chart.get(s.id)) {
              chart.addSeries(s);
            }
          });
        }
        chart.update(newConfig);
      }, true);

      scope.$on('highchartsng.reflow', function () {
        chart.reflow();
      });

      scope.$on('$destroy', function() {
        if (chart) {
          try{
            chart.destroy();
          }catch(ex){
            // fail silently as highcharts will throw exception if element doesn't exist
          }

          $timeout(function(){
            element.remove();
          }, 0);
        }
      });
    }

    function link(scope, element, attrs) {
      function highchartsCb(Highcharts) {
        linkWithHighcharts(Highcharts, scope, element, attrs);
      }
      highchartsNGUtils
        .getHighcharts()
        .then(highchartsCb);
    }

    return {
      restrict: 'EAC',
      replace: true,
      template: '<div></div>',
      scope: {
        config: '=',
        customWatch: '='
      },
      link: link
    };
  }
}());
