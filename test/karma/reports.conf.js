/**
 * 'Karma' test runner configuration to generate reports.
 *
 * Created by Alex Smirnov <0lex0.smirnov@gmail.com>
 */
module.exports = function (config) {
    config.set({
        /** application root path is relative to Karma configs */
        basePath:   '../../',
        /** used frameworks */
        frameworks: ['jasmine', 'requirejs'],

        //@formatter:off
        files: [
        /** Use RequireJS to load libs & modules */
            {pattern: 'lib/js/angular.js', included: false},
            {pattern: 'lib/js/angular-mocks.js', included: false},
            {pattern: 'lib/js/angular-ui-router.js', included: false},
            {pattern: 'lib/isomorphic/system/modules-debug/*.js', included: false},
            {pattern: 'lib/isomorphic/skins/SmartClient/**', included: false},
            {pattern: 'ng-isc.js', included: false},
            {pattern: 'test/web/*.spec.js', included: false},
        /** load main bootstrap script only */
            'test/bootstrap.karma.js'
        ],
        //@formatter:on

        exclude: [],

        reporters: ['coverage', 'junit'],

        preprocessors: {
            'ng-isc.js': 'coverage'
        },

        coverageReporter: {
            type: 'lcov',
            dir:  'build/report/coverage'
        },

        junitReporter: {
            outputFile: 'build/report/junit-results.xml'
        },

        plugins:  [
            'karma-jasmine', 'karma-requirejs', 'karma-coverage', 'karma-junit-reporter', 'karma-phantomjs-launcher'
        ],

        /* config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG */
        logLevel: config.LOG_INFO,

        autoWatch: false,

        /*  browsers: ['Chrome'], */
        browsers:  ['PhantomJS'],

        /* Continuous Integration mode. If true, Karma captures browsers, runs the tests and exits */
        singleRun: true
    });
};
