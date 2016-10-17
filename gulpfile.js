'use strict';

/**
 * Gulpfile
 *
 * gulp --option:
 *   gulp --production create files min
 */
var gulp = require('gulp'),
    meanstack = require('meanstack/lib/gulp'),
    assets = require('./resources/assets/gulp.assets');

gulp.task('fonts', function () {
    return meanstack.copy(
        assets.fonts.src,
        assets.fonts.dist
    );
});

gulp.task('images', function () {
    return meanstack.image(
        assets.images.src,
        assets.images.dist
    );
});

gulp.task('style', function () {
    return meanstack.style(
        assets.style.src,
        assets.style.dist,
        assets.style.options
    );
});

gulp.task('dependencies', function () {
    return meanstack.script(
        assets.dependencies.src,
        assets.dependencies.dist,
        assets.dependencies.options
    );
});

gulp.task('angular', function () {
    return meanstack.script(
        assets.angular.src,
        assets.angular.dist,
        assets.angular.options
    );
});

gulp.task('controllers', function () {
    return meanstack.script(
        assets.controllers.src,
        assets.controllers.dist,
        assets.controllers.options
    );
});

/**
 * Clear directory
 */
gulp.task('clean', function () {
    return meanstack.clean(assets.clean);
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
    meanstack.browserSync.init(assets.browserSync);
});

/**
 * Gulp Watch
 */
gulp.task('watch', ['default', 'browserSync'], function () {
    (assets.watch).forEach(function (obj) {
        gulp.watch(obj.src, obj.task);
    });
});
