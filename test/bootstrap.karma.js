/**
 * 'Karma' test runner bootstrap script.
 *
 * Created by Alex Smirnov <0lex0.smirnov@gmail.com>
 */
(function (window, require) {
    'use strict';
    var allTestFiles;
    allTestFiles = [];
    /** Define spec-files mask: '*.spec.js' */
    var TEST_REGEXP = /\.spec\.js$/;
    /**
     * Normalize paths to RequireJS module names:
     * '/base/test/App.js' => 'test/App'
     *
     * @param path
     * @return {string}
     */
    var pathToModule = function (path) {
        var result = path.replace(/^\/base\//, '').replace(/\.js$/, '');
        return result;
    };

    /**
     * Add all spec-files to RequireJS dependencies array.
     */
    Object.keys(window.__karma__.files).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            var path = pathToModule(file);
            allTestFiles.push(path);
        }
    });

    /* init ISC */
    window.isomorphicDir = "base/lib/isomorphic/";

    /**
     * Configure RequireJS, load dependencies and launch the Karma test runner.
     */
    require({
        /** RequireJS root to load modules script. */
        baseUrl: '/base',
        paths:   {
            angular:        '/base/lib/js/angular',
            ngUiRouter:     '/base/lib/js/angular-ui-router',
            angularMock:    '/base/lib/js/angular-mocks',
            iscCore:        '/base/lib/isomorphic/system/modules-debug/ISC_Core',
            iscFoundation:  '/base/lib/isomorphic/system/modules-debug/ISC_Foundation',
            iscContainers:  '/base/lib/isomorphic/system/modules-debug/ISC_Containers',
            iscGrids:       '/base/lib/isomorphic/system/modules-debug/ISC_Grids',
            iscForms:       '/base/lib/isomorphic/system/modules-debug/ISC_Forms',
            iscDataBinding: '/base/lib/isomorphic/system/modules-debug/ISC_DataBinding',
            isomorphic:     '/base/lib/isomorphic/skins/SmartClient/load_skin'
        },
        shim:    {
            'angular':        {'exports': 'angular'},
            'ngUiRouter':     {
                deps:      ['angular'],
                'exports': 'angular'
            },
            'angularMock':    {
                deps:      ['angular'],
                'exports': 'angular.mock'
            },
            'iscCore':        {'exports': 'isomorphic'},
            'iscFoundation':  {deps: ['iscCore'], 'exports': 'isomorphic'},
            'iscContainers':  {deps: ['iscFoundation'], 'exports': 'isomorphic'},
            'iscGrids':       {deps: ['iscContainers'], 'exports': 'isomorphic'},
            'iscForms':       {deps: ['iscGrids'], 'exports': 'isomorphic'},
            'iscDataBinding': {deps: ['iscForms'], 'exports': 'isomorphic'},
            'isomorphic':     {deps: ['iscDataBinding'], 'exports': 'isomorphic'}
        }
    }, allTestFiles, function () {
        window.__karma__.start();
    }, function (err) {
        /** log errors */
        console.log('Test bootstrap error:', err);
    });
}(window, require));
