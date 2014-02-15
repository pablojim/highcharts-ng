highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.

Current Version (0.0.4)
---------------

`<highchart id="chart1" config="chartConfig"></highchart>`

- See http://pablojim.github.io/highcharts-ng/examples/example.html for an extended example. Also Available in the example directory - thanks @crusat
- Basic example: http://jsfiddle.net/pablojim/Hjdnw/
- Example with dynamic x-axis: http://jsfiddle.net/pablojim/7cAq3/

The highchartsNgConfig resembles an exploded highcharts options object:


```javascript
highchartsNgConfig = {
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
                 },
             },

             //The below properties are watched separately for changes.

             //Series object - a list of series using normal highcharts series options.
             series: [{
                 data: [10, 15, 12, 8, 7]
             }],
             //Title configuration
             title: {
                 text: 'Hello'
             },
             //Boolean to control showng loading status on chart
             loading: false,
             //Configuration for the xAxis. Currently only one x axis can be dynamically controlled.
             //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
             xAxis: {
              currentMin: 0,
              currentMax: 20,
              title: {text: 'values'}
             },
             //Whether to use HighStocks instead of HighCharts. Defaults to false.
             useHighStocks: false
             }
```

All properties on the chart configuration are optional. Each property is watched for changes by angularjs.
NOTE:
A common error is to put other highcharts options directly into the highchartsNgConfig.
In general if the highcharts option you want isn't listed above you probably want to put it in highchartsNgConfig.options

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


Versions
--------------

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

Features:
---------

- Adding and removing series
- Setting/Updating Chart options
- Updating the chart title


Caveats:
--------

- Due to many equality checks the directive maybe slow with large datasets (this is solvable though...)
- Whole Chart/Series is often redrawn where a simple update of data would suffice
- If you don't assign ids to your series - incremental ids will be added
- Needs tests!



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/pablojim/highcharts-ng/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Build Status](https://travis-ci.org/pablojim/highcharts-ng.png)](https://travis-ci.org/pablojim/highcharts-ng)

