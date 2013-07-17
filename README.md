highcharts-ng
=============

AngularJS directive for Highcharts

A simple Angularjs directive for Highcharts.

`<highchart id="chart1" series="chart.series" title="chart.title" options="chart.options"></highchart>`

See an example here: [http://jsfiddle.net/pablojim/Cp73s/](http://jsfiddle.net/pablojim/Cp73s/)

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

See an example here: [http://jsfiddle.net/pablojim/Cp73s/](http://jsfiddle.net/pablojim/Cp73s/)
