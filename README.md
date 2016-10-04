highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.

Google Group: https://groups.google.com/forum/#!forum/highcharts-ng

Current Version (0.0.12)
------------------------

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

__Warning__: The `chartConfig` object is _slightly different_ than the default Highcharts config object. ( _Please see the FAQ below for details_ )

- See http://pablojim.github.io/highcharts-ng/examples/example.html for an extended example. Also Available in the example directory - thanks @crusat
- Basic example: http://jsfiddle.net/pablojim/Hjdnw/
- Example with dynamic x-axis: http://jsfiddle.net/pablojim/7cAq3/
- Basic Highstocks example http://jsfiddle.net/pablojim/r88yszk0/
- Support for Highmaps - see: http://rawgit.com/pablojim/highcharts-ng/master/example/maps/example.html
- Getting access to the Chart object/Add a print button - http://jsfiddle.net/pablojim/m4pcpv5g/

The `chartConfig` attribute mentioned above resembles an exploded Highcharts options object:

```javascript
//This is not a highcharts object. It just looks a little like one!
var chartConfig = {

  options: {
      //This is the Main Highcharts chart config. Any Highchart options are valid here.
      //will be overriden by values specified below.
      chart: {
          type: 'bar'
      },
      tooltip: {
          style: {
              padding: 10,
              fontWeight: 'bold'
          }
      }
  },
  //The below properties are watched separately for changes.

  //Series object (optional) - a list of series using normal Highcharts series options.
  series: [{
     data: [10, 15, 12, 8, 7]
  }],
  //Title configuration (optional)
  title: {
     text: 'Hello'
  },
  //Boolean to control showing loading status on chart (optional)
  //Could be a string if you want to show specific loading text.
  loading: false,
  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
  //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
  xAxis: {
  currentMin: 0,
  currentMax: 20,
  title: {text: 'values'}
  },
  //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
  useHighStocks: false,
  //size (optional) if left out the chart will default to size of the div or something sensible.
  size: {
   width: 400,
   height: 300
  },
  //function (optional)
  func: function (chart) {
   //setup some logic for the chart
  }
};
```

All properties on the chart configuration are optional. If you don't need a feature best to leave it out completely - Highcharts will usually default to something sensible. Each property is watched for changes by angularjs.
NOTE:
A common error is to put other Highcharts options directly into the chartConfig.
In general if the Highcharts option you want isn't listed above you probably want to put it in chartConfig.options

The Highcharts object can be accessed with ```chartConfig.getHighcharts()```. This is a simple way to access all the Highcharts API that is not currently managed by this directive. See the JSFiddle basic example to see how this is used to call the print function of Highcharts.

Features:
---------

- Adding and removing series
- Setting/Updating Chart options
- Updating the chart title
- 2 way binding to chart xAxis
- Control of Loading status
- Resizes with screen size changes.


Caveats:
--------

- Due to many equality checks the directive maybe slow with large datasets
- Whole Chart/Series is often redrawn where a simple update of data would suffice
- If you don't assign ids to your series - incremental ids will be added
- The 2 way binding to xAxis properties should be treated as experimental
- Navigator/scrollbar cannot run with liveRedraw enabled at this time
- Highcharts <=3 requires jQuery or ```<script src="http://code.highcharts.com/3/adapters/standalone-framework.js"></script>```
- Needs tests!

FAQ:
--------


- Why doesn't my plot options/tooltip/drilldown/other feature work?

*At least half of all issues filed are due to this. Before you file an issue read this!*
A common error is to put other Highcharts options directly into the chartConfig.
In general if the Highcharts option you want isn't listed above you probably want to put it in chartConfig.options.

- How do I get access to the chart object?

From version 0.0.8 onwards you can use `config.getHighcharts`. 95% of the time you won't need this and should instead change the chartConfig instead.

Be careful - if you manually change something with the chart object that is also in the chartConfig the chart and the config may end up out of sync.  

- Why don't you just use the standard Highcharts format?

Let's consider the below snippet.

```javascript
$scope.chartConfig = {
   options: {...}, //Highcharts options - using standard Highcharts config
   //other "dynamic" options
   title: {...}
   series [...]
}
```
In the ```chartConfig``` object above the ```options``` property is a standard Highcharts options object. e.g. anything you can pass into ````new Highcharts.Chart(options);``` works here.

This options object is watched for changes. When something changes here the whole chart is recreated.

The other dynamic properties are ones that we can change without affecting the whole chart - using the API at http://api.highcharts.com/highcharts#Chart e.g. if you change the title we can call chart.setTitle and not have to recreate the whole chart. Splitting them out from the main options object means we can watch them separately.

So anything that has an API to change is declared outside the main options object.

Hope this makes sense! 


- The chart does not fit into the parent container? How to fix that?
 
This may happen for example, when you place your chart in a bootstrap col - element. For now, you may apply the following workaround to fit your chart in the container:

```javascript
        $scope.config = {
            options: {
            ...
            },
            ...
            // other configuration here,
            ...
            func: function(chart) {
                $timeout(function() {
                    chart.reflow();
                }, 0);
            }
        };
    }
```
This forces the chart to reflow after container and chart have finished rendering. Don't forget to include the dependency to $timeout. Full discussion in https://github.com/pablojim/highcharts-ng/issues/300.
 
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
