'use strict';

/**
 * Gulpfile
 *
 * gulp --option:
 *   gulp --production create files min
 */
var gulp = require('gulp'),
    meanstack = require('meanstack/lib/gulp'),
    path = {
        dist: './public/',
        src: './resources/assets/',
        bower: './resources/assets/bower/',
        angular: './resources/assets/javascripts/angular/',
        meanstack: './node_modules/meanstack/'
    };

gulp.task('fonts', function () {
    return meanstack.copy(
        [
            path.bower + 'bootstrap-sass/assets/fonts/bootstrap/*.{otf,eot,svg,ttf,woff,woff2}',
            path.src + 'fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'
        ],
        path.dist + 'fonts/'
    );
});


gulp.task('images', function () {
    return meanstack.image(
        [
            path.src + 'images/**.{png,jpg,jpeg,ico}'
        ],
        path.dist + 'images/'
    );
});

gulp.task('style', function () {
    return meanstack.style(
        [
            path.src + 'stylesheets/sass/main.scss'
        ],
        path.dist + 'stylesheets/',
        {
            concat: true
        }
    );
});

gulp.task('dependencies', function () {
    return meanstack.script(
        [
            path.bower + 'jquery/dist/jquery.js',
            path.bower + 'bootstrap-sass/assets/javascripts/bootstrap.js',
            path.bower + 'angular/angular.js',
            path.bower + 'angular-ui-router/release/angular-ui-router.js',
            path.bower + 'oclazyload/dist/ocLazyLoad.js',

            // MEANStack Modules angularjs
            path.meanstack + 'lib/angular/modules/path.js',
            path.meanstack + 'lib/angular/modules/route.js'

            // Application
            //
        ],
        path.dist + 'javascripts/',
        {
            jshint: false,
            concat: true,
            name: 'dependencies.js'
        }
    );
});

gulp.task('angular', function () {
    return meanstack.script(
        [
            path.angular + 'app.js',
            path.angular + 'config.js',
            path.angular + 'providers/**/*.js',
            path.angular + 'factory/**/*.js',
            path.angular + 'services/**/*.js',
            path.angular + 'directives/**/*.js',
            path.angular + 'routes.js',
            path.angular + 'run.js',
            path.angular + 'controllers/app/**/*.js'
        ],
        path.dist + 'javascripts/',
        {
            jshint: true,
            concat: true,
            name: 'angular.js'
        }
    );
});

gulp.task('controllers', function () {
    return meanstack.script(
        [
            path.angular + 'controllers/partials/**/*.js'
        ],
        path.dist + 'javascripts/controllers/',
        {
            jshint: true,
            concat: false,
            sourcemaps: {
                write: {
                    dir: '../maps'
                }
            }
        }
    );
});

/**
 * Clear directory
 */
gulp.task('clean', function () {
    return meanstack.clean(path.dist);
});

/**
 * Build
 */
gulp.task('build',
    [
        'fonts',
        'images',
        'style',
        'dependencies',
        'angular',
        'controllers'
    ]
);

/**
 * Start Gulp
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

/**
 * Reload Gulp
 */
gulp.task('bs-reload', function () {
    meanstack.browserSync.reload();
});

/**
 * Init browserSync
 */
gulp.task('browserSync', function () {
    meanstack.browserSync.init({
        proxy: "http://localhost:8000"
    });
});

/**
 * Gulp Watch
 */
gulp.task('watch', ['default', 'browserSync'], function () {
    gulp.watch(path.src + '/stylesheets/**', ['style']);
    gulp.watch(path.src + '/javascripts/**', ['angular', 'controllers']);
    gulp.watch('./resources/views/**', ['bs-reload']);
});
