'use strict';

/**
 * Gulpfile
 *
 * gulp --option:
 *   gulp or gulp watch create files min also not min.
 *   gulp --production creta only files min
 */
var argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    settings = require('./config'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    minimatch = require("minimatch"),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    path = {
        bower: __dirname + '/resources/assets/bower/',
        dist: __dirname + '/public/',
        src: __dirname + '/resources/assets/',
        angular: __dirname + '/resources/assets/javascripts/angular/'
    },
    files = {
        js: [
            path.bower + 'jquery/dist/jquery.js',
            path.bower + 'angular/angular.js',
            path.bower + 'angular-resource/angular-resource.js',
            path.bower + 'angular-ui-router/release/angular-ui-router.js',
            path.bower + 'oclazyload/dist/ocLazyLoad.js',
            path.bower + 'angular-animate/angular-animate.js',
            path.bower + 'bootstrap-sass/assets/javascripts/bootstrap.js',
            path.bower + 'AngularJS-Toaster/toaster.js',
            //develop files
            path.angular + '/modules/*.js',
            path.angular + 'app.js',
            path.angular + 'config.js',
            path.angular + 'configs/*.js',
            path.angular + 'factory/*.js',
            path.angular + 'services/*.js',
            path.angular + 'directives/*.js',
            path.angular + 'routers.js',
            path.angular + 'run.js',
            path.angular + 'controllers/app/*.js'
        ],
        js_modules: [
            path.angular + 'controllers/partials/*.js',
            path.angular + 'controllers/partials/login/*.js'
        ],
        css: [
            path.bower + 'AngularJS-Toaster/toaster.scss',
            path.bower + 'font-awesome/scss/font-awesome.scss',
            path.src + 'stylesheets/sass/main.scss',
            path.src + 'stylesheets/styles/**/*.{scss,css}'
        ],
        fonts: [
            path.bower + 'bootstrap-sass/assets/fonts/bootstrap/*.{otf,eot,svg,ttf,woff,woff2}',
            path.bower + 'font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
            path.src + 'fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'
        ],
        images: [
            path.src + 'images/**/*.{png,jpg,jpeg}'
        ],
        icons: [
            path.src + 'icons/*'
        ]
    },
    /**
     * Ignore files bower
     * Used - Not validation in jshint
     *
     * @param file
     * @returns {boolean}
     */
    notIsBower = function (file) {
        return !minimatch(file.path, path.bower + '**/*.js');
    },
    /**
     * Ignore files js_modules
     * Used - Not concat with main script
     *
     * @param file
     * @returns {boolean}
     */
    notIsModule = function (file) {
        if (typeof files.js_modules !== 'undefined' && Array.isArray(files.js_modules)) {
            for (var i = 0; i < (files.js_modules).length; i++) {
                if (minimatch(file.path, files.js_modules[i])) {
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * Compress images files.
     *
     * @param files
     * @param dist
     */
    compressImages = function (files, dist, level) {
        var optimizationLevel = (typeof level === 'undefined') ? 3 : level;

        gulp.src(files)
            .pipe(cache(
                imagemin(
                    {
                        optimizationLevel: optimizationLevel,
                        progressive: true,
                        interlaced: true
                    }
                )
            ))
            .pipe(gulp.dest(dist))
            .pipe(browserSync.reload({stream: true}))
    };

/**
 * Compress Images
 */
gulp.task('images', function () {
    compressImages(files.images, path.dist + 'images/');
});

/**
 * Compress Icons
 */
gulp.task('icons', function () {
    compressImages(files.icons, path.dist + '/');
});

/**
 * Compile SASS and compress CSS
 */
gulp.task('styles', function () {
    gulp.src(files.css)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulpif(!argv.production, gulp.dest(path.dist + 'stylesheets/')))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(path.dist + 'stylesheets/'))
        .pipe(browserSync.reload({stream: true}))
});

/**
 * Copy Fonts
 */
gulp.task('fonts', function () {
    return gulp.src(files.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.dist + 'fonts/'))
        .pipe(browserSync.stream());
});

/**
 * Compile scripts
 */
gulp.task('scripts', function () {
    return gulp.src((files.js).concat(files.js_modules))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulpif(notIsBower, jshint()))
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(notIsModule, concat('main.js')))
        .pipe(gulpif(!argv.production, gulp.dest(path.dist + 'javascripts/')))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'javascripts/'))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Clear directory
 */
gulp.task('clean',
    require('del').bind(null, path.dist)
);

/**
 * Build sequence
 */
gulp.task('build', function (callback) {
    runSequence(
        'scripts',
        'styles',
        ['fonts', 'images', 'icons'],
        callback);
});

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
    browserSync.reload();
});

/**
 * Gulp Watch
 */
gulp.task('watch', ['default'], function () {
    browserSync.init({
        proxy: settings.server.hostname + ":" + settings.server.port
    });
    gulp.watch(path.src + "/stylesheets/**/**.{css,scss}", ['styles']);
    gulp.watch(path.src + "/javascripts/**/**.js", ['scripts']);
    gulp.watch(path.src + "/images/**/**", ['images']);
    gulp.watch(path.src + "/fonts/**/**", ['fonts']);
    gulp.watch("**.hbs", ['bs-reload']);
});
