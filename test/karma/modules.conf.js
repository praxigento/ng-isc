/**
 * 'Karma' test runner configuration to test spec-files for all modules.
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

        autoWatch: true,

        /* Continuous Integration mode. If true, Karma captures browsers, runs the tests and exits */
        singleRun: false,

        browsers: ['Chrome'],

        reporters: [],

        plugins: [
            'karma-firefox-launcher', 'karma-script-launcher', 'karma-chrome-launcher', 'karma-jasmine',
            'karma-requirejs', 'karma-phantomjs-launcher'
        ]
    });
};
