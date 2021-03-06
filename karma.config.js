var webpackConfig = require('./webpack-test.config.js');
require('phantomjs-polyfill')
webpackConfig.entry = ""; // you can override anything you want from the project webpack config

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-matchers'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatchBatchDelay: 300,
    captureTimeout: 60000,
    browserNoActivityTimeout: 100000,
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './src/test.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      './src/test.ts': ['webpack'],
      './src/**/!(*.spec)+(.js)': ['coverage']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      },
      quiet: true, //reduce spam
      noInfo: true //reduce spam
    },
    webpack: webpackConfig,
    reporters: [
      'dots',
      'coverage'
    ],
    coverageReporter: {
      reporters: [
        {
          dir: './builds/docs/coverage/',
          subdir: '.',
          type: 'html'
        },{
          dir: './builds/docs/coverage/',
          subdir: '.',
          type: 'text-summary',
          file: 'summary.text'
        }
      ]
    }
  });
};
