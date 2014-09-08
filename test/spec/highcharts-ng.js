'use strict';

describe('Module: highchartsNg', function () {
  var scope,
      $sandbox,
      $compile,
      $timeout,
      options,
      title,
      destroyed,
      usedChartConstructor;

  // load the controller's module
  beforeEach(module('highcharts-ng'));

  beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
    title = {};
    destroyed = false;
    usedChartConstructor = '';

    var chart = {
      series: [],
      redraw: angular.noop,
      setTitle: function(newTitle) {
        title = newTitle;
      },
      hideLoading: angular.noop,
      destroy: function() {
        destroyed = true;
      }
    };

    window.Highcharts = {
      Chart: function (opt) {
        options = opt;
        usedChartConstructor = 'Chart';

        return chart;
      },
      StockChart: function (opt) {
        options = opt;
        usedChartConstructor = 'StockChart';

        return chart;
      },
      Map: function (opt) {
        options = opt;
        usedChartConstructor = 'Map';

        return chart;
      }
    };
    scope = $rootScope;
    $compile = _$compile_;
    $timeout = _$timeout_;

    $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
  }));

  afterEach(function() {
    $sandbox.remove();
    scope.$destroy();
  });

  var templates = {
    'default': {
      scope: {},
      element: '<highchart></highchart>'
    },
    'simpleChartConfig': {
      scope: {
        chartConfig: {
          options: { chart: { type: 'bar' } }
        }
      },
      element: '<highchart config="chartConfig"></highchart>'
    },
    'stockChartConfig': {
      scope: {
        chartConfig: {
          useHighStocks: true
        }
      },
      element: '<highchart config="chartConfig"></highchart>'
    }
  };

  function compileDirective(template) {
    template = template ? templates[template] : templates['default'];
    angular.extend(scope, template.scope || templates['default'].scope);
    var $element = $(template.element).appendTo($sandbox);
    $element = $compile($element)(scope);
    scope.$digest();
    return $element;
  }

  it('uses default options', function() {
    compileDirective();

    expect(options).not.toBe({});
  });

  it('passes options to highcharts', function () {
    compileDirective('simpleChartConfig');

    expect(options.chart.type).toBe('bar');
  });

  describe('useHighStocks', function() {
    beforeEach(function() {
      compileDirective('stockChartConfig');
    });

    it('uses highstocks', function() {
      expect(usedChartConstructor).toBe('StockChart');
    });
  });

  describe('when the scope is destroyed', function() {
    var elm;

    beforeEach(function() {
      elm = compileDirective();
      scope.$destroy();
    });

    it('destroys the chart', function() {
      expect(destroyed).toBe(true);
    });

    it('removes the element', function() {
      $timeout.flush();

      expect($sandbox.children().length).toBe(0);
    });
  });
});
