/**
 * Created by Alex Smirnov <0lex0.smirnov@gmail.com>
 */
var gulp = require('gulp');
/** clean up temporary and target files */
var clean = require('gulp-clean');
/** JS code quality tool */
var jshint = require('gulp-jshint');
/** Generate complexity analysis reports with plato (https://github.com/es-analysis/plato) */
var plato = require('gulp-plato');
/** Display the size of your project */
var size = require('gulp-size');
/** Generate a TODO.md file from your javascript todos and fixmes */
var todo = require('gulp-todo');
/** A yuidoc plugin for Gulp */
var yuidoc = require("gulp-yuidoc");
/** Run Jasmine tests with minijasminenode (Jasmine 1.3) */
var jasmine = require('gulp-jasmine');
/** testing environment to developers */
var karma = require('gulp-karma');
//var coverage = require('gulp-coverage');

gulp.task('test', function () {
    var testFiles = [
        'test/**/*.spec.js'
    ];
    // Be sure to return the stream
    return gulp.src(testFiles).pipe(karma({
            configFile: 'test/karma/modules.conf.js',
            action:     'run'
        })).on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
    });
});

/**
 * Clean up all not source directories.
 */
gulp.task('clean', function () {
    gulp.src(['build/js/', 'build/report/'], {read: false}).pipe(clean());
});

/**
 * Generate YUIDoc. This gulp plugin is an early release, we should use Grunt for YUDoc.
 */
gulp.task('yuidoc', function () {
    gulp.src(['build/report/yuidoc'], {read: false}).pipe(clean());
    gulp.src('ng-isc.js').pipe(yuidoc()).pipe(gulp.dest("build/report/yuidoc"));
});


gulp.task('plato', function () {
    gulp.src('ng-isc.js').pipe(plato('build/report/plato', {
        jshint:     {
            options: {
                strict: true
            }
        },
        complexity: {
            trycatch: true
        }
    }));
});

gulp.task('default', function () {

    // gulp.src('ng-isc.js').pipe(jshint()).pipe(jshint.reporter('jshint-stylish'));
    //gulp.src('test/**/*.spec.js').pipe(jasmine());
    gulp.src('ng-isc.js').pipe(todo('build/report/todo.md'));
});
