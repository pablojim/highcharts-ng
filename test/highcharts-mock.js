'use strict';

window.Highcharts = (function () {
  var ns = {};

  ns.reset = function () {
    ns.chart = jasmine.createSpyObj('chart', [
      'redraw',
      'setTitle',
      'hideLoading',
      'destroy',
      'get',
      'addSeries',
      'update']);
    ns.chart.series = [];
    ns.usedChartConstructor = null;
    ns.options = null;
  };

  ns.Chart = function (opt) {
    ns.options = opt;
    ns.usedChartConstructor = 'Chart';
    return ns.chart;
  };
  ns.StockChart = function (opt) {
    ns.options = opt;
    ns.usedChartConstructor = 'StockChart';
    return this.chart;
  };
  ns.Map = function (opt) {
    ns.options = opt;
    ns.usedChartConstructor = 'Map';
    return ns.chart;
  };
  return ns;
}());


