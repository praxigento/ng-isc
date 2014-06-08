module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'test/karma/reports.conf.js',
                singleRun: true
            }
        },

        coveralls: {
            options: {
                debug: true,
                coverage_dir: 'build/report/coverage',
                dryRun: false,
                force: true,
                recursive: true
            }
        },

        changelog: {
            options: {
            }
        }
    });

    /** load plugins */
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-conventional-changelog');

    /** default tasks */
    grunt.registerTask('default', [
//        'karma'
    ]);

    grunt.registerTask('coverage', [
//        'karma:coverage',
        'coveralls'
    ]);
};
