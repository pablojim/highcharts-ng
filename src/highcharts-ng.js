if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'highcharts-ng';
}

(function () {
  'use strict';
  /*global angular: false*/
  var Highcharts = null;

  if (window && window.Highcharts) {
    Highcharts = window.Highcharts;
  } else if (module && module.exports === 'highcharts-ng') {
        Highcharts = require('highcharts');
  }


  angular.module('highcharts-ng', [])
    .component('highchart', {
        bindings: {
            config: '<',
            changeDetection: '<'
          },
          controller: HighChartNGController
    });

  HighChartNGController.$inject = ['$element', '$timeout'];

  function HighChartNGController($element, $timeout) {
    var seriesId = 0;
    var yAxisId = 0;
    var ctrl = this;
    var prevConfig = {};
    var mergedConfig = {};
    var detector = ctrl.changeDetection || angular.equals;
    this.$onInit = function() {
      ctrl.config.getChartObj = function(){
        return ctrl.chart;
      };
      prevConfig = angular.merge({}, ctrl.config);
      mergedConfig = getMergedOptions($element, ctrl.config, seriesId);
      ctrl.chart = new Highcharts[getChartType(mergedConfig)](mergedConfig);

      // Fix resizing bug
      // https://github.com/pablojim/highcharts-ng/issues/550
      var originalWidth = $element[0].clientWidth;
      var originalHeight = $element[0].clientHeight;
      $timeout(function() {
        if ($element[0].clientWidth !== originalWidth || $element[0].clientHeight !== originalHeight) {
          ctrl.chart.reflow();
        }
      }, 0, false);
    };

        this.removeUnlinkedObjects = function(mergedConfig) {
            /*
                Removes unlinked objects, items that have been removed in the config,
                but not yet removed from the HighChart object
            */

            //First check to see if there are any yAxis that need to be removed
            //If a series is linked to the yAxis, it will be removed by HighCharts

            if (mergedConfig.yAxis && Array.isArray(mergedConfig.yAxis)) {
                var yAxisIds = ensureIds(mergedConfig.yAxis, yAxisId);
                for (var i = ctrl.chart.yAxis.length - 1; i >= 0; i -= 1) {
                    var a = ctrl.chart.yAxis[i];
                    if (yAxisIds.indexOf(a.options.id) < 0) {
                        //if we don't set redraw to true, it can create
                        //glitches in the chart's rendering where the series
                        //doesn't completely re-render
                        a.remove(true);
                    }
                }
            }

            //Next remove the series
            if (mergedConfig.series && Array.isArray(mergedConfig.series)) {
                var seriesIds = ensureIds(mergedConfig.series, seriesId);
                for (var i = ctrl.chart.series.length - 1; i >= 0; i -= 1) {
                    var s = ctrl.chart.series[i];
                    if (s.options.id !== 'highcharts-navigator-series' && seriesIds.indexOf(s.options.id) < 0) {
                        //if we don't set redraw to true, it can create
                        //glitches in the chart's rendering where the series
                        //doesn't completely re-render
                        s.remove(true);
                    }
                }
            }

        }

    this.$doCheck = function() {
      if(!detector(ctrl.config, prevConfig)) {
        prevConfig = angular.merge({}, ctrl.config);
        mergedConfig = getMergedOptions($element, ctrl.config, seriesId);

        //Remove any unlinked objects before adding
        this.removeUnlinkedObjects(mergedConfig);

        //Allows dynamic adding of yAxis
        if (mergedConfig.yAxis && Array.isArray(mergedConfig.yAxis)) {
            //moving isX here for code readability. addAxis requires a bool "isX"
            var isX = false;
          // Add any new yAxis
          angular.forEach(ctrl.config.yAxis, function(s) {
            if (!ctrl.chart.get(s.id)) {
              ctrl.chart.addAxis(s, isX); //isX = false
            }
          });
        }

        //Allows dynamic adding of series
        if (mergedConfig.series) {
          // Add any new series
          angular.forEach(ctrl.config.series, function(s) {
            if (!ctrl.chart.get(s.id)) {
              ctrl.chart.addSeries(s);
            }
          });
        }

        ctrl.chart.update(mergedConfig, true);
      }
    };

    this.$onDestroy = function() {
        if (ctrl.chart) {
          try{
            ctrl.chart.destroy();
          }catch(ex){
            // fail silently as highcharts will throw exception if element doesn't exist
          }

          $timeout(function(){
            $element.remove();
          }, 0);
        }
      };
    }

  function getMergedOptions(element, config, seriesId) {
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
      navigator: {},
    };

    if (config) {
      //check all series and axis ids are set
      if(config.series) {
        ensureIds(config.series, seriesId);
      }

      mergedOptions = angular.merge(defaultOptions, config);
    } else {
      mergedOptions = defaultOptions;
    }
    mergedOptions.chart.renderTo = element[0];

    //check chart type is set
    return mergedOptions;
  }

  var chartTypeMap = {
    'stock': 'StockChart',
    'map':   'Map',
    'chart': 'Chart'
  };

  function getChartType(config) {
    if (config === undefined || config.chartType === undefined) return 'Chart';
        return chartTypeMap[('' + config.chartType).toLowerCase()];
    }

    function ensureIds(chartCollection, collectionId) {
        /*
            Ensures each item in the iteratble chartCollection has an id,
            and if not auto-generates one incrementing collectionId
        */
        var ids = [];
        angular.forEach(chartCollection, function(s) {
            if (!angular.isDefined(s.id)) {
                collectionId += 1
                s.id = 'cc-' + collectionId;
            }
            ids.push(s.id);
        });

        return ids;
    }


}());
