highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.


Examples
--------

See example in ./example/charts/general-example.html (https://rawgit.com/pablojim/highcharts-ng/master/example/charts/general-example.html)

Also:

- Basic: http://jsfiddle.net/gh/get/jquery/3.1.1/pablojim/highcharts-ng/tree/master/jsfiddles/basic/
- Polar Chart: http://jsfiddle.net/gh/get/jquery/3.1.1/pablojim/highcharts-ng/tree/master/jsfiddles/polar/
- Multi Axis: http://jsfiddle.net/gh/get/jquery/3.1.1/pablojim/highcharts-ng/tree/master/jsfiddles/multi_axis/
- Resizing to screen size: http://jsfiddle.net/gh/get/jquery/3.1.1/pablojim/highcharts-ng/tree/master/jsfiddles/resizing/
- Disabled change detection http://jsfiddle.net/gh/get/jquery/3.1.1/pablojim/highcharts-ng/tree/master/jsfiddles/disabled_change_detection/
- Recreating chart http://jsfiddle.net/gh/get/jquery/3.1.1/pablojim/highcharts-ng/tree/master/jsfiddles/recreating/

License
-------
This library is available under the MIT license. However it and is a wrapper for Highcharts. Highcharts itself has an own license. So make sure to follow their license as well (https://github.com/highcharts/highcharts/blob/master/license.txt)

Note: You need to include the Highcharts library your self. It is not included in this repository.

Current Version
---------------
**Needs Highcharts/Highstock >= 5.0.0**

**Only supports AngularJS >= 1.5.8**

**Configuration Format is not compatible with highcharts-ng 0.x.0**


**Setup:**

Install with npm:

```bash
npm install highcharts-ng
```

or with bower:

```bash
bower install highcharts-ng --save
```

Add highcharts as project dependency with npm
```bash
npm install highcharts
```

or with bower:

```bash
bower install highcharts --save
```

Add references to Highcharts/Highstocks:

```html
<script src="http://code.highcharts.com/stock/highstock.src.js"></script>
```

or

```html
<script src="http://code.highcharts.com/highcharts.src.js"></script>
```

Add Highcharts to your Angular app config:

```javascript
var myapp = angular.module('myapp', ["highcharts-ng"]);
```

(optional) if you have some problems with resizing the chart to screen size, include the highcharts-ng css file

```html
<link href="dist/highcharts-ng.css" rel="stylesheet">
```

Make a chart!

```html
<highchart id="chart1" config="chartConfig"></highchart>
```

The `chartConfig` object should be the same as a normal highcharts configuration. Any options that work in highcharts should work here also. To use highstock charts, you just need to add `chartType: 'stock'` to your `chartConfig`.

It is **Highly Recommended** to give all Series and Axes a distinct ID.

All properties on the chart configuration are optional. If you don't need a feature best to leave it out completely - Highcharts will usually default to something sensible. Each property is watched for changes by angularjs.

After construction the Highcharts Chart object can be accessed with ```chartConfig.getChartObj()```. This is a simple way to access all the Highcharts API that is not currently managed by this directive. See the JSFiddle basic example to see how this is used to call the print function of Highcharts.

Sometimes it could make sense to create an entire new Highcharts Chart instead of updating the previous one. For this to happen, you need to pass an entire new chart configuration object to the component instead of updating the previous configuration object. (See example section above)

If you know the chart data is not going to change, you can disabled the changeDetection to improve performance. This can be done with the attribute ```disable-change-detection="true"```. However this really only affects charts with huge data sets. (See example section above)

Features:
---------

- Adding and removing series
- Setting/Updating Chart options
- Updating the chart title
- Resizes with screen size changes.
- Providing a custom changeDetection function or expression - for speed a custom changeDetection function can be provided to save dirty checking the full chart config.

Features Not Supported that were previously supported:
------------------------------------------------------
- 2 way binding to chart xAxis. (use chartConfig.getChartObj() to get axis values)
- Control of Loading status though the config (use chartConfig.getChartObj() to get axis values)
Both of these should be possible to add with the right PR
- Use of add and remove points on dynamically updated series


Caveats:
--------

- Due to many equality checks the directive maybe slow with large datasets - try using changeDetection instead
- Whole Chart/Series is often redrawn where a simple update of data would suffice
- If you don't assign ids to your series - incremental ids will be added. This may mean extra redraws.
- Needs more tests!

FAQ:
--------


- Whats different to previous 0.0.X versions?

This version is much much simpler and should be more stable. Some features however are still to be implemented
e.g. 2-way binding to axes and loading functionality

- How do I get access to the chart object?

You can use `config.getChartObj`. 95% of the time you should not need this and should instead change the chartConfig instead.

Be careful - if you manually change something with the chart object that is also in the chartConfig the chart and the config may end up out of sync.  

- Why don't you just use the standard Highcharts format?

Since 1.0.0, vanilla Highcharts objects are supported!



Versions
--------

Version 1.2.1
-------------
Fixes https://github.com/pablojim/highcharts-ng/issues/592


Version 1.2.0
-------------
Remove explicit dependency on Highcharts due to licensing concerns and also allows user to choose between Highcharts and Highstocks.

- added support for $onChanges, added new binding to disable change detection https://github.com/pablojim/highcharts-ng/pull/622

Thanks to @ngehlert and others for their contributions.

Version 1.1.0
-------------
Now has explicit dependency on highcharts.js.

- Fix for resizing https://github.com/pablojim/highcharts-ng/issues/550
- Added module loader support https://github.com/pablojim/highcharts-ng/commit/508df111886c4be8b26e82cb6d3e2303f17efed8
Thanks to @houssemba and others for the contributions.

Version 1.0.1
-------------
- Fix for for multiple yAxes https://github.com/pablojim/highcharts-ng/issues/201

Version 1.0.0
-------------
- only support Highchart/Highstock >= 5.0.0
- only support AngularJS >= 1.5.8 (see https://github.com/toddmotto/angular-component for lower versions)
- Move to AngularJS Component
- Now supports vanilla Highcharts config
- Supports custom change detection functions
- Should be much more stable and less bugs
- 2 way axes binding no longer supported
- loading property no longer supported

Version 0.0.13
--------------
- Minor bugfix

Version 0.0.12
--------------
- use addPoint where possible
- seperate lazyloader - thanks @graingert
- Lots of updates and fixes - thanks @graingert

Version 0.0.11
----------------
- Bug fix for console error with missing yAxis

Version 0.0.10
----------------
- Bug fix for 0.0.9 - problems with deep extend

Version 0.0.9
----------------
- Lazy loading - thanks @FDIM
- Better navigator support - thanks @ASethi77
- Lots of bug fixes - thanks to all contributors

Version 0.0.8
----------------
- added config.getHighcharts - thanks @ValentinH
- Lots of bug fixes - thanks to all contributors
- Now with support for Highmaps - see: http://rawgit.com/pablojim/highcharts-ng/master/example/maps/example.html

Version 0.0.7
----------------
- Better support for large data series - thanks @f1ghtingfalcons
- Lots of bug fixes - thanks to all contributors

Version 0.0.6
----------------
- Added no data logic - thanks @eranbetzalel
- Added reflow event thanks @pajooh
- Added example for size setting
- Minor bug fixes

Version 0.0.5
----------------
- Now watches size property
- More robust checks around axes

Version 0.0.4
----------------
- Fix to minimised file

Version 0.0.3
----------------
- Migrated to grunt, bower and npm
- Bug fixes
- Some speedups

Version 0.0.2
----------------
- Removed JQuery dependency
- Allowed for null config option

Version 0.0.1 (not compatible with current version)
----------------

```html
<highchart id="chart1" series="chart.series" title="chart.title" options="chart.options"></highchart>
```

See an example here: [http://jsfiddle.net/pablojim/46rhz/](http://jsfiddle.net/pablojim/46rhz/)


[![Build Status](https://travis-ci.org/pablojim/highcharts-ng.png)](https://travis-ci.org/pablojim/highcharts-ng)
