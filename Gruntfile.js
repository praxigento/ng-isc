module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'test/karma/reports.conf.js',
                singleRun:  true
            }
        }
    });

    /** load plugins */
    grunt.loadNpmTasks('grunt-karma');

    /** default tasks */
    grunt.registerTask('default', [
//        'karma'
    ]);
};
