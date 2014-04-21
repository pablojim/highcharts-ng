'use strict';

describe('Module: highchartsNg', function () {
  // load the controller's module
  beforeEach(module('highcharts-ng'));

  it('should extend a simple object', inject(function (highchartsNGUtils) {
    var noop = function(){};
    var source = {bar: 'abc', arr: [1, 'two', {}], nested: {a: {b: 2}}, fn: noop},
      dest = {foo: '123', bar: 3, nested: {c: 5}, fn: parseInt};
    highchartsNGUtils.deepExtend(dest, source);
    expect('123').toEqual(dest.foo);
    expect('abc').toEqual(dest.bar);
    expect([1, 'two', {}]).toEqual(dest.arr);
    expect(noop).toEqual(dest.fn);
    expect(source.arr).not.toBe(dest.arr);
    expect(source.arr[2]).not.toBe(dest.arr[2]);
    expect({c: 5, a: {b : 2}}).toEqual(dest.nested);
    expect(source.nested).not.toBe(dest.nested);
  }));

});
