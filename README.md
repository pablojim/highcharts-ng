highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.

Current Version (0.0.7)
---------------

Setup:

Install with bower/npm:

```bower install highcharts-ng```

Add references to highcharts/highstocks

```<script src="http://code.highcharts.com/stock/highstock.src.js"></script>```

or

```<script src="http://code.highcharts.com/highcharts.src.js"></script>```

Add Highcharts to your angular app config 

```var myapp = angular.module('myapp', ["highcharts-ng"]);```

Make a chart!

```<highchart id="chart1" config="chartConfig"></highchart>```

- See http://pablojim.github.io/highcharts-ng/examples/example.html for an extended example. Also Available in the example directory - thanks @crusat
- Basic example: http://jsfiddle.net/pablojim/Hjdnw/
- Example with dynamic x-axis: http://jsfiddle.net/pablojim/7cAq3/

The `chartConfig` attribute mentioned above resembles an exploded highcharts options object:

```javascript
var chartConfig = {

  //This is not a highcharts object. It just looks a little like one!
  options: {
      //This is the Main Highcharts chart config. Any Highchart options are valid here.
      //will be ovverriden by values specified below.
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

  //Series object (optional) - a list of series using normal highcharts series options.
  series: [{
      data: [10, 15, 12, 8, 7]
  }],
  //Title configuration (optional)
  title: {
      text: 'Hello'
  },
  //Boolean to control showng loading status on chart (optional)
  loading: false,
  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
  xAxis: {
      currentMin: 0,
      currentMax: 20,
      title: {
          text: 'values'
      }
  },
  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
  useHighStocks: false,
  //size (optional) if left out the chart will default to size of the div or something sensible.
  size: {
      width: 400,
      height: 300
  },
  //function (optional)
  func: function(chart) {
      //setup some logic for the chart
  }

};
```

All properties on the chart configuration are optional. If you don't need a feature best to leave it out completely - Highcharts will usually default to something sensible. Each property is watched for changes by angularjs.
NOTE:
A common error is to put other highcharts options directly into the chartConfig.
In general if the highcharts option you want isn't listed above you probably want to put it in chartConfig.options

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
- When using with a highstocks navigator errors can occur
- Needs tests!

FAQ:
--------

- Why doesn't my plot options/tooltip/drilldown/other feature work?

*At least half of all issues filed are due to this. Before you file an issue read this!*
A common error is to put other highcharts options directly into the chartConfig.
In general if the highcharts option you want isn't listed above you probably want to put it in chartConfig.options.

- Why don't you just use the standard highcharts format?

Lets consider the below snippet.

```
$scope.chartConfig = {
   options: {...}, //highcharts options - using standard highcharts config
   //other "dynamic" options
   title: {...}
   series [...]
}
```
In chartConfig the ```options``` property is a standard highcharts options object. e.g. anything you can pass into ````new Highcharts.Chart(options);``` works here.

This options object is watched for changes. When something changes here the whole chart is recreated.

The other dynamic properties are ones that we can change without affecting the whole chart - using the api at http://api.highcharts.com/highcharts#Chart e.g. if you change the title we can call chart.setTitle and not have to recreate the whole chart. Splitting them out from the main options object means we can watch them separately.

So anything that has an api to change is declared outside the main options object.

Hope this makes sense! 

 



Versions
--------------

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

`<highchart id="chart1" series="chart.series" title="chart.title" options="chart.options"></highchart>`

See an example here: [http://jsfiddle.net/pablojim/46rhz/](http://jsfiddle.net/pablojim/46rhz/)


[![Build Status](https://travis-ci.org/pablojim/highcharts-ng.png)](https://travis-ci.org/pablojim/highcharts-ng)
