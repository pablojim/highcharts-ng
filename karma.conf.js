// Karma configuration
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/highcharts-mock.js',
      'src/*.js',
      'test/spec/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['progress', 'coverage'],

    // web server port
    port: 8080,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: 'LOG_INFO',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
    ]

  });
};
