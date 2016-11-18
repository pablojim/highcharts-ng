highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.

Google Group: https://groups.google.com/forum/#!forum/highcharts-ng


Basic jsfiddle: coming soon
See example in ./example/charts/general-example.html 


BETA Version (0.1.0)
--------------------
**Note Needs Highcharts/Highstock >= 5.0.0 or **


**Setup:**

Install with npm:

```bash
npm install highcharts-ng
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

Make a chart!

```html
<highchart id="chart1" config="chartConfig"></highchart>
```

The `chartConfig` object should be the same as a normal highcharts configuration. Any options that work in highcharts should work here also.

It is **Highly Recommended** to give all Series and Axes a distinct ID.

All properties on the chart configuration are optional. If you don't need a feature best to leave it out completely - Highcharts will usually default to something sensible. Each property is watched for changes by angularjs.

After construction the Highcharts Chart object can be accessed with ```chartConfig.getHighcharts()```. This is a simple way to access all the Highcharts API that is not currently managed by this directive. See the JSFiddle basic example to see how this is used to call the print function of Highcharts.

Features:
---------

- Adding and removing series
- Setting/Updating Chart options
- Updating the chart title
- Resizes with screen size changes.
- Providing a customWatch function or expression - for speed a custom watch function can bbe provided to save dirty checking the full chart config.

Features Not Supported that were previously supported:
------------------------------------------------------
- 2 way binding to chart xAxis. (use chartConfig.getHighcharts() to get axis values)
- Control of Loading status though the config (use chartConfig.getHighcharts() to get axis values)
Both of these should be possible to add with the right PR


Caveats:
--------

- Due to many equality checks the directive maybe slow with large datasets - try using customWatch instead
- Whole Chart/Series is often redrawn where a simple update of data would suffice
- If you don't assign ids to your series - incremental ids will be added. This may mean extra redraws. 
- Needs more tests!

FAQ:
--------


- Whats different to previous 0.0.X versions?

This version is much much simpler and should be more stable. Some features however are still to be implemented 
e.g. 2-way binding to axes and loading functionality

- How do I get access to the chart object?

You can use `config.getHighcharts`. 95% of the time you won't need this and should instead change the chartConfig instead.

Be careful - if you manually change something with the chart object that is also in the chartConfig the chart and the config may end up out of sync.  

- Why don't you just use the standard Highcharts format?

Now we do!

Lazy loading
------------

If you used to use the lazyload feature, this has been moved to a separate
module. It is recommended to use a module loader such as Webpack or browserify
instead.

```html
<script src="path/to/highcharts-ng/dist/lazyload.js"></script>
```

```javascript
var app = angular.module('myapp', ["highcharts-ng-lazyload"])
  .config(['highchartsNGProvider', function (highchartsNGProvider) {
    // will load highcharts (and standalone framework if jquery is not present) from code.highcharts.com
    highchartsNGProvider.lazyLoad();
    highchartsNGProvider.lazyLoad([
      highchartsNGProvider.HIGHCHART, // or HIGHSTOCK,
      // you may add any additional modules and they will be loaded in the same sequence
      "maps/modules/map.js",
      "mapdata/custom/world.js",
    ]);
    highchartsNGProvider.basePath("/js/"); // change base path for scripts, default is http(s)://code.highcharts.com/
  }])
 .controller(["highchartsNG", function(highchartsNG){
    // do anything you like
    // ...
    highchartsNG.getHighcharts().then(function(Highcharts){
      // init chart config, see lazyload example
    });
  });
```



Versions
--------------

Version 0.1.0 (Beta)
--------------------
- only support Highchart/Highstock >= 5.0.0
- now supports vanilla highcharts config
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
