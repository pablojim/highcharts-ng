'use strict';

describe('Module: highchartsNg', function () {
  var scope, $sandbox, $compile, $timeout, options;

  // load the controller's module
  beforeEach(module('highcharts-ng'));

  beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
    var noop = function() {};
    window.Highcharts = {Chart: function (opt) {
      options = opt;
      return {series: [],
        redraw: noop,
        setTitle: noop,
        hideLoading: noop,
        destroy: noop};
    }};
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

  it('should pass options to highcharts', function () {
    var elm = compileDirective();
    //expect(elm.text()).toBe('hello world');
  });

});
